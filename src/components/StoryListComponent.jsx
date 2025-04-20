import {Card, Col} from 'react-bootstrap';
import {Eye, Heart} from 'react-bootstrap-icons';
import {useState} from 'react';

const StoryListComponent = ({storyList, clickHandler}) => {
    const [selectedStoryId, setSelectedStoryId] = useState(null);

    const handleCardClick = (storyId) => {
        setSelectedStoryId(storyId); // 선택된 카드 ID 저장
        clickHandler(storyId); // 기존 클릭 핸들러 실행
    };

    return (
        <>
            {storyList.map((story) => (
                <Col key={story.storyId}>
                    <Card
                        onClick={() => handleCardClick(story.storyId)}
                        className="h-100"
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedStoryId === story.storyId ? '#d3e4ff' : 'white', // 선택 시 색 변경
                            transition: 'background-color 0.3s ease' // 부드러운 색 변경 효과
                        }}
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
