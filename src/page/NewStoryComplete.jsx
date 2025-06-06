
import {Button, Card, Container, FormCheck, FormControl, FormGroup} from "react-bootstrap";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import jwtAxios from "../common/JwtAxios.js";
import useStoryStore from "../store/useStoryStore.js";
import {useNavigate} from "react-router-dom";

const NewStoryComplete = () => {
    const navigate = useNavigate();
    const titleInputRef = useRef(null);
    const [isPublic, setIsPublic] = useState(false);
    const {selectedSentences, baseStory} = useStoryStore();
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    function fetchTags() {
        axios.get("http://localhost:8080/api/tags")
            .then(res => {
                if (res.status === 200) {
                    setTags(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleTagClick = (tag) => {
        // 동일한 태그 객체 (같은 id와 name)가 이미 선택되어 있는지 확인
        const existingTagIndex = selectedTags.findIndex(selectedTag =>
            selectedTag.id === tag.id && selectedTag.name === tag.name
        );

        if (existingTagIndex !== -1) {
            // 정확히 같은 태그가 이미 선택되어 있으면 제거
            const newSelectedTags = [...selectedTags];
            newSelectedTags.splice(existingTagIndex, 1);
            setSelectedTags(newSelectedTags);
        } else {
            // 선택되지 않은 태그면 추가 (중복 허용)
            setSelectedTags([...selectedTags, tag]);
        }
    }

    const completeMakingStory = () => {
        const data = {
            title: titleInputRef.current.value,
            isPublic: isPublic,
            selectedSentences: selectedSentences,
            baseStory: baseStory,
            tagIds: selectedTags.map(tag => tag.id) // 선택된 태그 ID 배열 추가
        }
        jwtAxios.post(`http://localhost:8080/api/stories`, data)
            .then((response) => {
                console.log(response)
                if (response.data.code === 'CREATED') {
                    alert("동화가 성공적으로 만들어졌습니다.");
                    const storyId = response.data.data;
                    navigate(`/stories/${storyId}`);
                }

            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">동화 생성을 마무리해주세요!</h1>

            <Card className="p-4 mx-auto" style={{maxWidth: "600px"}}>
                <FormGroup className="mb-4">
                    <h5>제목</h5>
                    <FormControl
                        type="text"
                        ref={titleInputRef}
                        placeholder="동화 제목을 입력해주세요"
                    />
                </FormGroup>

                <FormGroup className="align-items-center mb-4">
                    <h5>공개</h5>
                    <FormCheck
                        type="switch"
                        checked={isPublic}
                        onChange={(e) => setIsPublic(e.target.checked)}
                    />
                </FormGroup>

                <div className="mb-3">
                    <h5 className="fw-bold">태그</h5>
                    <Card>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {tags.map((tag) => {
                                const isExactTagSelected = selectedTags.some(
                                    (selectedTag) =>
                                        selectedTag.id === tag.id && selectedTag.name === tag.name
                                );

                                return (
                                    <Button
                                        key={tag.id}
                                        className={isExactTagSelected ? "selected-tag" : ""}
                                        variant={isExactTagSelected ? "outline-primary" : "light"}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        # {tag.name}
                                    </Button>
                                );
                            })}
                        </div>
                    </Card>

                </div>

                <div className="mb-4">
                    <p className="text-muted">
                        선택된 태그:{" "}
                        <span className={"fw-bold"}>
                            {selectedTags.length > 0
                                ? selectedTags.map((tag) => `#${tag.name}`).join(", ")
                                : "없음"}
                        </span>

                    </p>
                </div>

                <div className="text-center">
                    <Button variant="success" onClick={completeMakingStory}>
                        저장
                    </Button>
                </div>
            </Card>
        </Container>

    )
}

export default NewStoryComplete;