import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {Card, Container, Row, Col, Image, Button} from "react-bootstrap";

function Index() {
    const [storyList, setStoryList] = useState([]);
    const navigate = useNavigate();

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

    const goToStoryDetail = (storyId) => {
        navigate(`/stories/${storyId}`);
    }

    return (
        <Container>
            <Button as={Link} to={"/story/new"}>동화 만들기</Button>

            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {storyList.map((story) => (
                    <Col key={story.storyId}>
                        <Card onClick={() => goToStoryDetail(story.storyId)} className="h-100">
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
    );
}

export default Index;
