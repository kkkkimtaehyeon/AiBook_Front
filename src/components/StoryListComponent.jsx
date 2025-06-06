import {Card, CardBody, CardText, CardTitle, Col} from 'react-bootstrap';
import {Eye, Heart} from 'react-bootstrap-icons';
import {useEffect, useState} from 'react';
import '/src/css/components/story/storyListComponent.css';

const StoryListComponent = ({storyList, clickHandler, handleTagParam}) => {
    const [selectedStoryId, setSelectedStoryId] = useState(null);

    const handleCardClick = (storyId) => {
        setSelectedStoryId(storyId); // 선택된 카드 ID 저장
        clickHandler(storyId); // 기존 클릭 핸들러 실행
    };

    useEffect(() => {
        console.log(storyList);
    }, []);

    return (
        <>
            {storyList.map((story) => (
                <Col key={story.storyId}>
                    <Card
                        className={"mb-3 p-1"}
                        onClick={() => handleCardClick(story.storyId)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedStoryId === story.storyId ? '#d3e4ff' : 'white',
                            transition: 'background-color 0.3s ease',
                        }}
                    >
                        {/*<img*/}
                        {/*    className={"card-img-top"}*/}
                        {/*    src={"/public/assets/image_loading.jpg"}*/}
                        {/*    alt={"..."} />*/}
                        <CardBody className={"text-start"}>
                            <CardTitle>{story.title}</CardTitle>
                            <CardText>{story.memberName}</CardText>
                            <Eye style={{color: "blue", marginRight: 2}}/>
                            <span>{story.viewCount} </span>
                            <Heart style={{color: "red", marginRight: 2}}/>
                            <span>{story.likeCount}</span>
                            {story.tagList !== null ? (
                                    <div>
                                        {story.tagList.map((tag) => (
                                            <button
                                                className="tag-btn"
                                                key={tag.id}
                                                onClick={(e) => {
                                                    e.stopPropagation();         // 카드 클릭 이벤트 차단
                                                    handleTagParam(tag.id);      // 태그 클릭 동작 수행
                                                }}
                                            >
                                                # {tag.name}
                                            </button>
                                        ))}
                                    </div>
                                ) :
                                null
                            }

                        </CardBody>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default StoryListComponent;
