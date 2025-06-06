import {Card, CardBody, CardText, CardTitle, Col, Row} from 'react-bootstrap';
import {Eye, Heart} from 'react-bootstrap-icons';
import {useEffect, useState} from 'react';
import '/src/css/components/story/storyListComponent.css'; // Import custom styles

const MyStoryListComponent = ({storyList, clickHandler}) => {
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const dummyTags = ["액션", "로맨스", "코미디"]

    useEffect(() => {
        console.log(storyList);
    }, []);

    const handleCardClick = (storyId) => {
        setSelectedStoryId(storyId); // 선택된 카드 ID 저장
        clickHandler(storyId); // 기존 클릭 핸들러 실행
    };

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
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        {/*<img*/}
                        {/*    className={"card-img-top"}*/}
                        {/*    src={"/src/assets/image_loading.jpg"}*/}
                        {/*    alt={"..."} />*/}
                        <CardBody className={"text-start"}>
                            <CardTitle>{story.title}</CardTitle>
                            <CardText>{story.memberName}</CardText>
                            <Eye style={{color: "blue", marginRight: 2}}/>
                            <span>{story.viewCount} </span>
                            <Heart style={{color: "red", marginRight: 2}}/>
                            <span>{story.likeCount}</span>
                            <div>
                                {dummyTags.map((tag, index) => (
                                    <span key={index}>#{tag}</span>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default MyStoryListComponent;
