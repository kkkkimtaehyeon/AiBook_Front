import { Card, Col } from 'react-bootstrap';
import { Eye, Heart } from 'react-bootstrap-icons';
import { useGoToStoryDetail } from '../utils/goToStoryDetail.js';

const StoryListComponent = ({ storyList }) => {
    const goToStoryDetail = useGoToStoryDetail();

    return (
        <>
            {storyList.map((story) => (
                <Col key={story.storyId}>
                    <Card
                        onClick={() => goToStoryDetail(story.storyId)}
                        className="h-100"
                        style={{cursor: 'pointer'}}
                    >
                        <Card.Body>
                            <Card.Title>{story.title}</Card.Title>
                            <Card.Text>{story.memberName}</Card.Text>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Eye className="me-1"/>{story.viewCount}
                                </div>
                                <div>
                                    <Heart className="me-1"/>{story.likeCount}
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default StoryListComponent;