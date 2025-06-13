import {Button, Card, Container, Row} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import {useEffect, useState} from "react";
import {ArrowRepeat} from "react-bootstrap-icons";
import useStoryStore from "../../store/useStoryStore.js";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import jwtAxios from "../../common/JwtAxios.js";
import {ai} from "../../common/CustomAxios.js";

const NewStoryCoverPage = () => {
    const MAX_REGENERATE_COUNT = 1; // 최대 재생성 횟수
    const [isLoading, setIsLoading] = useState(true);
    const [regenerateCount, setRegenerateCount] = useState(MAX_REGENERATE_COUNT);
    const {coverImageBase64, baseStory, selectedSentences} = useStoryStore();
    const navigate = useNavigate();
    const [regeneratedCoverImageBase64, setRegeneratedCoverImageBase64] = useState("");
    const {storyId} = useParams();
    const location = useLocation();
    const title = location.state.title;
    const isPublic = location.state.isPublic;
    const tagIds = location.state.tagIds;

    useEffect(() => {
        console.log({coverImageBase64});
        if (coverImageBase64 === "") {
            setIsLoading(true);
            return;
        }
        setIsLoading(false);
    }, [coverImageBase64]);

    const createStory = () => {
        const coverImage = regeneratedCoverImageBase64 === "" ? coverImageBase64 : regeneratedCoverImageBase64;

        const data = {
            title: title,
            isPublic: isPublic,
            tagIds: tagIds,
            baseStory: baseStory,
            selectedSentences: selectedSentences,
            coverImageBase64: coverImage
        }
        jwtAxios.post("/stories", data)
            .then(res => {
                if (res.status === 201) {
                    const savedStoryId = res.data.data;
                    navigate(`/stories/${savedStoryId}`);
                }
            })
            .catch(err => {
                console.log("Error creating story:", err);
            });
    }

    const regenerateImage = () => {
        if (regenerateCount === 0) {
            alert("이미지를 더 이상 재생성할 수 없습니다.");
            return;
        }
        setRegenerateCount(regenerateCount - 1);

        ai.post(`/v3/stories/${storyId}/image-generation`)
            .then(res => {
                if (res.status === 200) {
                    setRegeneratedCoverImageBase64(res.data.base64Image);
                }

            })
            .catch(err => {
                console.log("Error regenerating image:", err);
            })
    }

    // 현재 표시할 이미지를 결정하는 함수
    const getCurrentImage = () => {
        return regeneratedCoverImageBase64 === "" ? coverImageBase64 : regeneratedCoverImageBase64;
    }

    return (
        <Container className={"py-4"}>
            <PageHeader title={"새로운 동화"}/>
            <Row className={"m-2 mb-4"}>
                <Card
                    className="w-100 rounded-5 justify-content-center overflow-hidden p-0"
                    style={{height: '450px'}}
                >
                    <img
                        src={"data:image/jpeg;base64," + getCurrentImage()}
                        alt="img"
                        className="h-100 w-100"
                        style={{
                            objectFit: 'cover',
                            borderRadius: 'inherit'
                        }}
                    />
                </Card>
            </Row>

            <Row>
                <ArrowRepeat
                    className={"mb-2"}
                    style={{fontSize: "30px"}}
                    onClick={() => regenerateImage()}
                />
                <p>{regenerateCount} / {MAX_REGENERATE_COUNT} </p>
            </Row>

            <Row className="mt-4 p-2">
                <Button
                    // disabled={isLoading}
                    onClick={() => createStory()}
                >
                    완료
                </Button>
            </Row>

        </Container>
    )
}

export default NewStoryCoverPage;