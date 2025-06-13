import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import PageHeader from "../../newComponents/PageHeader.jsx";
import useStoryStore from "../../store/useStoryStore.js";
import {ai, api} from "../../common/CustomAxios.js";

const NewStorySettingPage = () => {
    const [tags, setTags] = useState([{id: 1, name: "액션"}, {id: 2, name: "로맨스"}]);
    const {storyId} = useParams();
    const titleRef = useRef(null);
    const [isPublic, setIsPublic] = useState(true);
    const [selectedTags, setSelectedTags] = useState([]);
    const navigate = useNavigate();
    const {setCoverImageBase64, selectedSentences} = useStoryStore();
    useEffect(() => {
        requestCoverImageGeneration();
        fetchTags();
    }, []);

    const requestCoverImageGeneration = () => {
        ai.post(`/v3/stories/${storyId}/image-generation`, {contents: selectedSentences})
            .then(res => {
                if (res.status === 200) {
                    const base64Image = res.data.base64Image;

                    console.log("이미지가 성공적으로 생성 되었습니다.");
                    setCoverImageBase64(base64Image);

                } else {
                    console.error("Failed to send cover image generation request.");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    const goToNewStoryCoverPage = () => {
        const title = titleRef.current.value;
        console.log({
            storyId,
            title,
            isPublic,
            selectedTags
        })
        if (title.trim() === "") {
            alert("제목을 입력해주세요.");
            return;
        }
        if (selectedTags.length === 0) {
            alert("태그를 선택해주세요.");
            return;
        }

        navigate(`/stories/${storyId}/new/cover`, {
            state:
                {
                    title: title,
                    isPublic: isPublic,
                    tagIds: selectedTags.map(tag => tag.id)
                }
        });
    }


    const fetchTags = () => {
        api.get("/tags")
            .then(res => {
                if (res.status === 200) {
                    setTags(res.data.data);
                }
            })
            .catch(err => {
                console.error("Error fetching tags:", err);
            })
    }

    const handleTagClick = (tag) => {
        setSelectedTags(prevSelectedTags => {
            const isAlreadySelected = prevSelectedTags.some(selectedTag => selectedTag.id === tag.id);

            if (isAlreadySelected) {
                // 이미 선택된 태그라면 제거
                return prevSelectedTags.filter(selectedTag => selectedTag.id !== tag.id);
            } else {
                // 선택되지 않은 태그라면 추가
                return [...prevSelectedTags, tag];
            }
        });
    }

    const isTagSelected = (tagId) => {
        return selectedTags.some(tag => tag.id === tagId);
    }

    return (
        <Container className="py-4" style={{marginBottom: "100px"}}>
            <PageHeader title={"새로운 동화"}/>

            {/* 제목 입력창 */}
            <Row className="mb-4">
                <h5 className="text-start mb-3">제목</h5>
                <Col>
                    <Form.Control
                        type="text"
                        placeholder="제목을 입력해주세요."
                        ref={titleRef}
                        className="ps-4 py-3 rounded-pill bg-light border-0"
                        style={{fontSize: '16px'}}
                    />
                </Col>
            </Row>

            {/* 공개 여부 선택 */}
            <Row className="mb-4">
                <Col>
                    <h5 className="text-start mb-3">공개 여부</h5>
                    <Card
                        className={`d-flex justify-content-between p-3 mt-2 ${isPublic === true ? 'border border-primary' : ''}`}
                        onClick={() => setIsPublic(true)}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="text-start">
                            <span className="fw-bold">공개</span>
                            <p className="mb-0">모든 사람들이 내 동화를 볼 수 있어요.</p>
                        </div>
                    </Card>

                    <Card
                        className={`d-flex justify-content-between p-3 mt-2 ${isPublic === false ? 'border border-primary' : ''}`}
                        onClick={() => setIsPublic(false)}
                        style={{cursor: 'pointer'}}
                    >
                        <div className="text-start">
                            <span className="fw-bold">비공개</span>
                            <p className="mb-0">나만 동화를 볼 수 있어요.</p>
                        </div>
                    </Card>
                </Col>
            </Row>

            {/* 태그 선택 */}
            <Row className="mb-4">
                <Col>
                    <h5 className="text-start mb-3">태그 선택</h5>
                    <div className="d-flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <Button
                                key={tag.id}
                                variant={isTagSelected(tag.id) ? "border-primary" : "light"}
                                className={`rounded-pill px-3 ${isTagSelected(tag.id) ? 'border-primary' : ''}`}
                                onClick={() => handleTagClick(tag)}
                                style={{cursor: 'pointer'}}
                            >
                                {tag.name}
                            </Button>
                        ))}
                    </div>
                </Col>
            </Row>

            {/* 동화 완료 버튼 */}
            <Row className="mt-4 p-2">
                <Button onClick={() => goToNewStoryCoverPage()}>다음</Button>
            </Row>
        </Container>
    );
};

export default NewStorySettingPage;