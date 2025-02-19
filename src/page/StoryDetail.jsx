import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Container, Row} from "react-bootstrap";
import {Eye, Heart, HeartFill, Pause, Play, Stop} from 'react-bootstrap-icons';
import jwtAxios from "../common/JwtAxios.js";
import useLoginStore from "../store/useLoginStore.js";

const StoryDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const {isLogin, memberId} = useLoginStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                    setIsLiked(response.data.data.liked);
                }
            })
            .catch(error => console.log(error));
    }, [storyId]);

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

    const likeStory = () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);

        jwtAxios.post(`http://localhost:8080/api/stories/${storyId}/like`)
            .then((response) => {
                if (!response.data.success) {
                    setIsLiked(isLiked);
                    alert("좋아요가 실패했습니다.");
                }
            })
            .catch(error => {
                setIsLiked(isLiked);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                } else {
                    alert("좋아요가 실패했습니다.");
                }
            });
    }

    const playDubbingAudio = (dubbingAudioUrl) => {
        setIsPlaying(true);
        const newAudio = new Audio(dubbingAudioUrl);
        setAudio(newAudio);
        newAudio.play();
        newAudio.onended = () => setIsPlaying(false);
    }

    const stopDubbingAudio = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    }

    const deleteStory = () => {
        jwtAxios.delete(`http://localhost:8080/api/stories/${storyId}`)
            .then(response => {
                if (response.data.success) {
                    alert("동화가 성공적으로 삭제되었습니다.");
                    navigate("/");
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container>
            <Row>
                <div>
                    <Button as={Link} to={"/"}>목록보기</Button>
                    {isLogin && memberId === storyDetail.memberId ?
                        <div className="d-inline-block mx-2">
                            <Button as={Link} to={"/"}>수정</Button>
                            <Button as={Link} to={`/stories/${storyId}/dubbing`}>더빙 추가</Button>
                            <Button onClick={deleteStory}>삭제</Button>
                        </div> : null
                    }

                    <Eye size={20}></Eye>{storyDetail.viewCount}
                    <Button onClick={likeStory} variant="light">
                        {isLiked ? <HeartFill color="red" size={20}/> : <Heart size={20}/>}
                    </Button>
                </div>
            </Row>
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
                                    {currentPage.dubbingAudioUrl && (
                                        <div>
                                            {isPlaying ?
                                                <Pause onClick={stopDubbingAudio}/>
                                                :
                                                <Play onClick={() => {
                                                    playDubbingAudio(currentPage.dubbingAudioUrl)
                                                }}/>
                                            }
                                        </div>
                                    )}
                                </Card>
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
    );
}

export default StoryDetail;