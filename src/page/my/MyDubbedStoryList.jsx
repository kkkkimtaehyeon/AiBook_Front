import {Button, Card, Col, Container} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import jwtAxios from "../../common/JwtAxios.js";
import {useEffect, useState} from "react";

const MyDubbedStoryList = () => {

    const [dubbedStoryList, setDubbedStoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyDubbedStoryList();
    }, []);

    const fetchMyDubbedStoryList = () => {
        jwtAxios.get("http://localhost:8080/api/stories/my/dubbed-stories")
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.data.content);
                    setDubbedStoryList(response.data.data.content);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const goToStoryDubbingDetail = (storyDubbingId) => {
        navigate(`/dubbing-stories/${storyDubbingId}`);
    }

    return (
        <Container>
            <Button as={Link} to={"/dubbing/new"}>
                + 추가하기
            </Button>
            {dubbedStoryList.map((story) => (
                <Col key={story.id}>
                    <Card
                        onClick={() => goToStoryDubbingDetail(story.id)}
                        className="h-100"
                        style={{cursor: 'pointer'}}
                    >
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Text>{story.voiceName}</Card.Text>
                            <div className="d-flex justify-content-between">
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Container>
    );
}

export default MyDubbedStoryList;