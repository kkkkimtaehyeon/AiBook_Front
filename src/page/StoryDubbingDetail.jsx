import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Button, Card, Container, Row} from "react-bootstrap";
import AudioPlayerComponent from "../components/AudioPlayerComponent.jsx";

const StoryDubbingDetail = () => {

    const {storyDubbingId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        fetchStoryDubbing();
    }, []);

    const fetchStoryDubbing = () => {
        axios.get(`http://localhost:8080/api/stories/dubbed-stories/${storyDubbingId}`)
            .then((response) => {
                if (response.data.success) {
                    setStoryDetail(response.data.data);
                }
            })
            .catch(error => console.log(error));

    }

    const goToNextPage = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1);
        }
    }

    const goBackToPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <Container>
            {/*<Row>*/}
            {/*    <div>*/}
            {/*        <Button as={Link} to={"/"}>목록보기</Button>*/}
            {/*        {isLogin && memberId === storyDetail.memberId ?*/}
            {/*            <div className="d-inline-block mx-2">*/}
            {/*                <Button as={Link} to={`/stories/${storyId}/edit`}>수정</Button>*/}
            {/*                <Button onClick={deleteStory}>삭제</Button>*/}
            {/*            </div> : null*/}
            {/*        }*/}

            {/*        <Eye size={20}></Eye>{storyDetail.viewCount}*/}
            {/*        <Button onClick={likeStory} variant="light">*/}
            {/*            {isLiked ? <HeartFill color="red" size={20}/> : <Heart size={20}/>}*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</Row>*/}
            <Row>
                {pageNumber === 0 ? (
                    <Card style={{width: "100%", height: "500px"}}>
                        <h1>{storyDetail.title}</h1>
                        <span>글쓴이 {storyDetail.author}</span>
                    </Card>
                ) : (
                    (() => {
                        const currentPage = storyDetail.pages?.find(page => page.pageNumber === pageNumber) || {};
                        return (
                            <>
                                <Card style={{width: "100%", height: "500px"}}>
                                    <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
                                </Card>
                                <AudioPlayerComponent currentPage={currentPage}/>
                                <p>{currentPage.pageNumber || 0}/10</p>
                            </>
                        );
                    })()
                )}

            </Row>
            <Row>
                <div>
                    {pageNumber > 0 && <Button onClick={goBackToPage}>이전</Button>}
                    {pageNumber < 10 && <Button onClick={goToNextPage}>다음</Button>}
                </div>
            </Row>
        </Container>
    )
}

export default StoryDubbingDetail;