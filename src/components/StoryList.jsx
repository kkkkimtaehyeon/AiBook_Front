import {Card, Col} from "react-bootstrap";
import {Eye, Heart} from "react-bootstrap-icons";
import {useGoToStoryDetail} from "../utils/goToStoryDetail.js";

const StoryList = ({storyList}) => {

    const goToStoryDetail = useGoToStoryDetail();

    return (
        <>
            {storyList.map((story) => (
                <Col key={story.storyId}>
                    <Card onClick={() => goToStoryDetail(story.storyId)}
                          className="h-100"
                          style={{cursor: 'pointer'}}>
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Text>{story.memberName}</Card.Text>
                            <Eye/>{story.viewCount}
                            <Heart/>{story.likeCount}
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
}

export default StoryList;