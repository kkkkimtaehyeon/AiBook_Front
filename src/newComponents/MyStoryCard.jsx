import {Col, Row} from "react-bootstrap";
import {Eye, Heart} from "react-bootstrap-icons";

const MyStoryCard = ({
                         story,
                         imageUrl = "/assets/image_loading.jpg",
                         onClick,
                         className = "mb-4"
                     }) => {

    const getImageUrl = (story) => {
        return story.coverImageUrl ? story.coverImageUrl : "/assets/image_loading.jpg";
    }
    return (
        <Row className={className}>
            <Col>
                <div
                    className="d-flex align-items-start"
                    onClick={() => onClick?.(story)}
                    style={{ cursor: onClick ? 'pointer' : 'default' }}
                >
                    <div className="me-3 flex-shrink-0">
                        <img
                            src={getImageUrl(story)}
                            alt={story.title}
                            className="rounded"
                            style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                backgroundColor: "#f8f9fa"
                            }}
                        />
                    </div>
                    <div className="flex-grow-1 text-start">
                        <span className="fw-bold mb-2">{story.title}</span>
                        <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
                            <Eye /> {story.viewCount} <Heart /> {story.likeCount}
                        </p>
                    </div>
                </div>
            </Col>
        </Row>
    );
};

export default MyStoryCard;