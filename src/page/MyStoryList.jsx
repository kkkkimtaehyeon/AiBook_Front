import {useEffect, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";
import {Card, CardBody, CardTitle, Col, Container, Row} from "react-bootstrap";
import {useGoToStoryDetail} from "../utils/goToStoryDetail.js";

const MyStoryList = () => {
    const [myStoryList, setMyStoryList] = useState([]);
    const navigate = useNavigate();
    const goToStoryDetail = useGoToStoryDetail();

    const fetchMyStoryList = () => {
        jwtAxios.get("http://localhost:8080/api/stories/my")
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setMyStoryList(response.data.data.content);
                } else {
                }

            })
            .catch(error => {
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                }
            });
    }

    const deleteStory = async (storyId) => {
        try {
            const response = await jwtAxios.delete(`http://localhost:8080/api/stories/${storyId}`);
            if (response.data.success) {
                if (response.data.data.code === "NO_CONTENT") {
                    window.location.reload();
                }
            } else {
                alert("동화 삭제가 실패했습니다.");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMyStoryList();
    }, []);


    return (
        <Container>
            <Row className="g-4">
                {myStoryList === null || myStoryList.length === 0 ? (
                    <p>아직 동화가 없습니다.</p>
                ) : (
                    myStoryList.map((story) => (
                        <Col key={story.storyId}>
                            <Card style={{cursor: "pointer"}}>
                                <CardBody onClick={() => goToStoryDetail(story.storyId)}>
                                    <CardTitle>{story.title}</CardTitle>
                                </CardBody>
                            </Card>

                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );


}

export default MyStoryList;