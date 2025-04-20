import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useStoryStore from "../store/useStoryStore.js";
import jwtAxios from "../common/JwtAxios.js";
import {Button, Container, Row, Col, Form, FormLabel} from "react-bootstrap";

const NewBaseStory = () => {
    const navigate = useNavigate();
    const baseStoryInputRef = useRef(null);
    const {setStoryId, restoreState, setExStory} = useStoryStore();
    const [isHelperOn, setIsHelperOn] = useState(false);

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
            const response = await jwtAxios.post("http://localhost:8080/api/stories/base-story", {baseStory: content});

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
                    <h3 className="text-center mb-4">시작 전, 나의 이야기를 작성해주세요!</h3>
                    <Form className="align-items-center">
                        <FormLabel className="me-2">입력 도우미</FormLabel>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            checked={isHelperOn}
                            onChange={() => setIsHelperOn(!isHelperOn)}
                        />
                    </Form>
                    <div className="mb-3">
                        {isHelperOn ? (
                            <span className="text-muted">입력 도우미가 준비 중입니다.</span>
                        ) : (
                            <textarea
                                ref={baseStoryInputRef}
                                placeholder="ex) 오늘은 엄마, 아빠와 함께 동물원에 갔어요. 날씨가 좋아서..."
                                rows={8}
                                className="form-control"
                                style={{
                                    resize: "none",
                                    fontSize: "1.1rem",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                }}
                            />
                        )}
                    </div>

                    <div className="text-center">
                        <Button onClick={saveBaseStory} variant="primary" size="lg" className="px-4 py-2 rounded-3">
                            동화 만들기
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewBaseStory;
