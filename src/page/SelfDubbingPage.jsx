import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Container} from "react-bootstrap";
import jwtAxios from "../common/JwtAxios.js";
import useRecordStore from "../store/useRecordStore.js";
import {Pause, Play} from "react-bootstrap-icons";
import AudioRecorder from "../components/AudioRecorder.jsx";

const SelfDubbingPage = () => {
    const {storyId} = useParams();
    const [story, setStory] = useState({});
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const {recordings, clearRecordings} = useRecordStore(); // 녹음 데이터 가져오기
    const navigate = useNavigate();

    useEffect(() => {
        fetchStory(storyId);
    }, [storyId]);

    const fetchStory = (id) => {
        axios.get(`http://localhost:8080/api/stories/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setStory(res.data.data);
                    setPages(res.data.data.pages);
                    setCurrentPage(0); // 페이지 바뀔 때 초기화
                }
            })
            .catch(err => {
                console.error("스토리 로딩 실패:", err);
            });
    }

    const toNext = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const toPrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
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

    const getContent = () => {
        return pages[currentPage]?.content ?? "페이지를 불러오는 중입니다.";
    }

    return (
        <Container>
            <Card className="p-3 mb-3">
                {getContent()}
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
                <AudioRecorder pageNumber={currentPage} />
            </Card>
            {pages.length > 0 && (
                <>
                    {currentPage > 0 && <Button onClick={toPrev} className="me-2">이전</Button>}
                    {currentPage < pages.length - 1 && <Button onClick={toNext}>다음</Button>}
                    {currentPage === pages.length - 1 && <Button onClick={uploadDubbing}>저장</Button>}
                </>
            )}
        </Container>
    );
};

export default SelfDubbingPage;
