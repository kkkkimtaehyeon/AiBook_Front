import {useEffect, useState} from 'react';
import VoiceListComponent from '../../components/VoiceListComponent.jsx';
import StoryListComponent from '../../components/StoryListComponent.jsx';
import jwtAxios from "../../common/JwtAxios.js"; // 나중에 추가할 컴포넌트

const DubbingSettings = () => {
    const [voiceId, setVoiceId] = useState(null);
    const [storyId, setStoryId] = useState(null);
    const [step, setStep] = useState(1);

    useEffect(() => {
        console.log("voice id: " + voiceId);
        console.log("story id: " + storyId);
    }, [voiceId, storyId]);

    const handleVoiceClick = (voiceId) => {
        setVoiceId(voiceId);
    }

    const handleStoryClick = (storyId) => {
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

    const handleDubbingRequest = async () => {
        // 더빙 요청 로직
        if (storyId && voiceId) {
            try {
                const response = await jwtAxios.post('/api/dubbing', {
                    storyId: storyId,
                    voiceId: voiceId
                });

                if (response.data.success) {
                    alert('더빙 요청 성공!');
                    // 성공 후 추가 로직 (예: 페이지 이동)
                }
            } catch (error) {
                console.error('더빙 요청 중 오류:', error);
                alert('더빙 요청 중 오류가 발생했습니다.');
            }
        }
    }

    return (
        <div className="dubbing-settings">
            {step === 1 && (
                <div className="story-selection">
                    <h2>스토리 선택</h2>
                    <StoryListComponent clickHandler={handleStoryClick}/>
                    <div className="navigation-buttons">
                        <button
                            onClick={handleNextStep}
                            disabled={!storyId}
                        >
                            다음
                        </button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="voice-selection">
                    <h2>보이스 선택</h2>
                    <VoiceListComponent clickHandler={handleVoiceClick}/>
                    <div className="navigation-buttons">
                        <button onClick={handlePreviousStep}>
                            뒤로
                        </button>
                        <button
                            onClick={handleDubbingRequest}
                            disabled={!voiceId}
                        >
                            더빙
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DubbingSettings;