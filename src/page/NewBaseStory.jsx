import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useStoryStore from "../store/useStoryStore.js";
import jwtAxios from "../common/JwtAxios.js";
import { Button, Container, Row, Col } from "react-bootstrap";

const NewBaseStory = () => {
    const navigate = useNavigate();
    const baseStoryInputRef = useRef(null);
    const { setStoryId, restoreState, setExStory } = useStoryStore();

    useEffect(() => {
        restoreState(); // 새로고침 시 기존 storyId 복구
    }, [restoreState]);

    const saveBaseStory = async () => {
        let content = baseStoryInputRef.current.value;
        if (content === "") {
            alert("나의 이야기를 작성해주세요.");
            return;
        }
        try {
            const response = await jwtAxios.post("http://localhost:8080/api/stories/base-story", { baseStory: content });

            if (response) {
                const responseData = response.data;
                if (responseData.code === "CREATED") {
                    const storyId = responseData.data;
                    setStoryId(storyId);
                    setExStory(content);
                    navigate(`/stories/${storyId}/pages/1/new`);
                }
            }
        } catch (error) {
            if (error.status === 403 || error.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login");
                return;
            }
            console.log(error);
        }
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h1 className="text-center mb-4">나의 이야기</h1>
                    <div>
            <textarea
                ref={baseStoryInputRef}
                placeholder="동화로 만들고 싶은 나의 이야기를 작성해주세요."
                rows={8}
                className="form-control mb-3"
                style={{
                    resize: "none",
                    fontSize: "1.1rem",
                    padding: "15px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
            />
                    </div>
                    <div className="text-center">
                        <Button onClick={saveBaseStory} variant="primary" size="lg" className="px-4 py-2 rounded-3">
                            다음 단계
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewBaseStory;
