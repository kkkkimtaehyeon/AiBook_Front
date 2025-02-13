import {useEffect, useState} from "react";
import useStoryStore from "../store/useStoryStore.js";
import {useNavigate, useParams} from "react-router-dom";
import jwtAxios from "../common/JwtAxios.js";
import {Button, Container, Row, Col, Card} from "react-bootstrap";

const NewStory = () => {
    const {storyId} = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();
    const {exStory, setExStory} = useStoryStore();
    const [contentOption1, setContentOption1] = useState("");
    const [contentOption2, setContentOption2] = useState("");
    const [contentOption3, setContentOption3] = useState("");
    const [selectedContent, setSelectedContent] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (exStory) {
            const generateStoryOptions = async () => {
                setLoading(true);

                try {
                    // GPT에게 문장후보 생성 요청
                    const data = {
                        source: exStory,
                        pageNumber: pageNumber,
                    };
                    const response = await jwtAxios.post("http://localhost:8000/api/story/generate", data);
                    // 문장후보 생성 성공 시 출력
                    if (response) {
                        setContentOption1(response.data.contentOption1);
                        setContentOption2(response.data.contentOption2);
                        setContentOption3(response.data.contentOption3);
                        setLoading(false);
                    }

                } catch (error) {
                    console.log(error);
                }
            };
            generateStoryOptions();
        }
    }, [pageNumber]);

    // 다음 페이지로 이동
    const goToNextPage = () => {
        const url = `http://localhost:8080/api/stories/${storyId}/pages/${pageNumber}`;
        jwtAxios.post(url, {
            selectedContent: selectedContent
        })
            .then((response) => {
                console.log(response);
                if (response.data.code === 'CREATED') {
                    // 이전 페이지에 선택한 문장을 저장
                    console.log(response);
                    const nextPage = Number(pageNumber) + 1;
                    if (nextPage <= 10) {
                        setExStory(selectedContent);
                        console.log("지난 이야기: " + exStory);
                        setPageNumber(nextPage);
                    } else {
                        navigate(`/stories/${storyId}/new/complete`);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const selectContentOption = (selectedContent) => {
        setSelectedContent(selectedContent);
        console.log("selectedContent: " + selectedContent);
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <span className="text-center mb-4">{pageNumber} 페이지</span>
                    <div className="mb-4">
                        <h3>이전 내용</h3>
                        <p className="border p-3 rounded-3 bg-light">{exStory}</p>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <Button className={"bg-light-subtle text-black"} disabled>
                                <span className="spinner-grow spinner-grow-sm text-primary" role="status" aria-hidden="true"></span>
                                이야기가 생성 중입니다...
                            </Button>
                        </div>
                    ) : (
                        <div className="content-container mb-4">
                            <h3>다음 내용을 선택해주세요.</h3>
                            <div className="d-flex flex-column align-items-start">
                                <Card className="mb-3" style={{cursor: 'pointer'}}
                                      onClick={() => selectContentOption(contentOption1)}>
                                    <Card.Body>
                                        <Card.Text>{contentOption1}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card className="mb-3" style={{cursor: 'pointer'}}
                                      onClick={() => selectContentOption(contentOption2)}>
                                    <Card.Body>
                                        <Card.Text>{contentOption2}</Card.Text>
                                    </Card.Body>
                                </Card>
                                <Card style={{cursor: 'pointer'}} onClick={() => selectContentOption(contentOption3)}>
                                    <Card.Body>
                                        <Card.Text>{contentOption3}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <Button onClick={goToNextPage} variant="primary" size="lg" className="px-4 py-2 rounded-3">
                            다음 페이지
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewStory;
