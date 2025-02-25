import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {Eye, Heart, HeartFill, Pause, Play} from 'react-bootstrap-icons';
import jwtAxios from "../common/JwtAxios.js";
import useLoginStore from "../store/useLoginStore.js";
import AudioRecorder from "../components/AudioRecorder.jsx";
import useRecordStore from "../store/useRecordStore.js";

const EditDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const {isLogin, memberId} = useLoginStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [title, setTitle] = useState("");
    const {recordings, clearRecordings} = useRecordStore(); // 녹음 데이터 가져오기

    const fetchStory = () => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                    setIsLiked(response.data.data.liked);
                    setTitle(response.data.data.title);
                }
            })
            .catch(error => console.log(error));
    }
    
    useEffect(() => {
        fetchStory();
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

    const uploadDubbing = () => {
        const formData = new FormData();

        // recordings 객체 안에 있는 Blob들을 각각 추가
        Object.entries(recordings).forEach(([pageNumber, blob]) => {
            formData.append("files", blob, `story-${storyId}-page-${pageNumber}.wav`);
        });

        jwtAxios.post(`http://localhost:8080/api/stories/${storyId}/dubbing`,
            formData,
            {headers: {"Content-Type": "multipart/form-data"}}
        )
            .then((response) => {
                alert("더빙이 성공적으로 업로드 되었습니다!");
                console.log(response);
                clearRecordings(); // 업로드 후 데이터 초기화
                navigate(`/stories/${storyId}`);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const editTitle = () => {
        const data = {
            title: title
        }
        jwtAxios.patch(`http://localhost:8080/api/stories/${storyId}`, data)
            .then(response => {
                if (response.data.success) {
                    alert("제목이 수정되었습니다!");
                    navigate(`/stories/${storyId}`);
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
                    {isLogin && memberId === storyDetail.memberId ?
                        <div className="d-inline-block mx-2">
                            <Button as={Link} to={`/stories/${storyId}`}>수정 취소</Button>
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
                    <Card style={{ width: "100%", height: "500px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Form style={{ textAlign: "center" }}>
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <FormControl
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ fontSize: "2rem", textAlign: "center", width: "80%" }}
                                />
                            </div>
                            <Button
                                onClick={editTitle}
                                style={{ marginTop: "10px" }}
                            >
                                제목 수정
                            </Button>
                        </Form>
                        <span style={{ marginTop: "10px", fontSize: "1.2rem" }}>글쓴이 {storyDetail.author}</span>
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
                                    <AudioRecorder pageNumber={pageNumber} />
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
                    {pageNumber === 10 && <Button onClick={uploadDubbing}>더빙 저장</Button>}
                </div>
            </Row>
        </Container>
    );
}

export default EditDetail;