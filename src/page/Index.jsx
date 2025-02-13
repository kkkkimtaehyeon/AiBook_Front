import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Card, Container, Row, Col, Image, Button} from "react-bootstrap";
import Footer from "../layout/Footer.jsx";
import {useGoToStoryDetail} from "../utils/goToStoryDetail.js";

function Index() {
    const [storyList, setStoryList] = useState([]);
    const goToStoryDetail = useGoToStoryDetail();
    useEffect(() => {
        axios.get("http://localhost:8080/api/stories")
            .then((response) => {
                console.log(response.data.data);
                setStoryList(response.data.data.content);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);


    return (
        <>
            <Container>
                <Card>
                    <div>
                        <h3>나만의 이야기를 직접 동화로 만들어 보세요!</h3>
                        <Button as={Link} to={"/story/new"}>동화 만들기</Button>
                    </div>
                </Card>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {storyList.map((story) => (
                        <Col key={story.storyId}>
                            <Card onClick={() => goToStoryDetail(story.storyId)}
                                  className="h-100"
                                  style={{cursor: 'pointer'}}>
                                {/*<Card.Img>*/}
                                {/*    <Image src={"#"}></Image>*/}
                                {/*</Card.Img>*/}
                                <Card.Body>
                                    <Card.Title>{story.title}</Card.Title>
                                    <Card.Text>{story.memberName}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer/>
        </>

    );
}

export default Index;
