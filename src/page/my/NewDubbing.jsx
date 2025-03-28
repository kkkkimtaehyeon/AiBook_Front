import {useEffect, useState} from 'react';
import VoiceListComponent from '../../components/VoiceListComponent.jsx';
import StoryListComponent from '../../components/StoryListComponent.jsx';
import jwtAxios from "../../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";
import {Button, Container, Row} from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent.jsx"; // 나중에 추가할 컴포넌트

const NewDubbing = () => {
    const [voiceId, setVoiceId] = useState(null);
    const [storyId, setStoryId] = useState(null);
    const [step, setStep] = useState(1);
    const [myStoryList, setMyStoryList] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyStoryList();
    }, []);

    const fetchMyStoryList = () => {
        jwtAxios.get(`http://localhost:8080/api/stories/my`)
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setMyStoryList(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                } else {
                }

            })
            .catch(error => {
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                }
            });
    }

    const handleVoiceClick = (voiceId) => {
        console.log("voice id: " + voiceId);
        setVoiceId(voiceId);
    }

    const handleStoryClick = (storyId) => {
        console.log("story id: " + storyId);
        setStoryId(storyId);
    }

    const handleNextStep = () => {
        // 스토리 선택 완료 후 다음 단계로
        if (storyId) {
            setStep(2);
        }
    }

    const handlePreviousStep = () => {
        // 이전 단계로 돌아가기
        setStep(1);
    }

    const requestDubbing = async () => {
        // 더빙 요청 로직
        if (storyId && voiceId) {
            try {
                const response = await jwtAxios.post(`/api/stories/${storyId}/voices/${voiceId}/dubbing`);

                if (response.data.success) {
                    alert('더빙이 진행되고 있습니다. 잠시만 기다려주세요!');
                    navigate('/');
                }
            } catch (error) {
                console.error('더빙 요청 중 오류:', error);
                alert('더빙 요청 중 오류가 발생했습니다.');
            }
        }
    }

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <Container>
            {step === 1 && (
                <div className="story-selection">
                    <h2>더빙할 동화를 선택해주세요</h2>
                    <Row className={"g-4"}>
                        <StoryListComponent
                            storyList={myStoryList}
                            clickHandler={handleStoryClick}
                        />

                    </Row>
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />
                    <div className="navigation-buttons">
                        <Button
                            onClick={handleNextStep}
                            disabled={!storyId}
                        >
                            다음
                        </Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="voice-selection">
                    <h2>보이스 선택</h2>
                    <VoiceListComponent clickHandler={handleVoiceClick}/>
                    <div className="navigation-buttons">
                        <Button onClick={handlePreviousStep}>
                            뒤로
                        </Button>
                        <Button
                            onClick={requestDubbing}
                            disabled={!voiceId}
                        >
                            더빙
                        </Button>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default NewDubbing;