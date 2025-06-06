import {Container} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import VoiceRecorder from "../../newComponents/VoiceRecorder.jsx";
import JwtAxios from "../../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";

const VoiceRegisterPage = () => {
    const voiceCloningAgreementScript = [
        '안녕하세요. 본인은 지금부터 제공하는 문장을 읽음으로써, 자신의 목소리를 복제하는 데 동의합니다.',
        '저는 이 녹음이 인공지능 기술을 활용해 저의 음성을 학습하고, 그 결과로 생성된 가상 음성이 다양한 서비스에 활용될 수 있음을 이해합니다.',
        '해당 목소리는 본인의 허락 없이 제3자에게 제공되지 않으며, 개인정보 보호를 위한 기술적, 관리적 조치를 충분히 이해하고 동의합니다.',
        '이 목소리 복제는 언제든 철회 요청이 가능하며, 철회 시 더 이상 사용되지 않음을 확인합니다.',
        '지금부터 저는 이 모든 내용에 동의하며, 아래 문장을 읽겠습니다.',
        '"저는 제 목소리를 복제하는 것에 동의하며, 이 목소리가 인공지능 기술로 활용되는 것에 동의합니다."'
    ];
    const navigate = useNavigate();

    const handleVoiceSubmit =  (audioBlob, voiceName) => {
        // 음성 등록 로직
        console.log('음성 등록:', {audioBlob, voiceName});

        const formData = new FormData();
        const uuid = crypto.randomUUID(); // 고유 ID 생성
        formData.append('audioFile', audioBlob, `${voiceName}_${uuid}.wav`);
        formData.append('name', voiceName);

        // await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기 (로딩 시뮬레이션)

        JwtAxios.post('/api/voices', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.status === 201) {
                alert(`"${voiceName}" 목소리가 성공적으로 등록되었습니다!`);
                navigate('/my/voices'); // 등록 후 마이 페이지로 이동
            } else {
                throw new Error('서버 오류');
            }
        }).catch(error => {
            console.error('서버 전송 실패:', error);
            alert('음성 등록에 실패했습니다. 다시 시도해주세요.');
        });
    };

    const handleRecordingComplete = (audioBlob) => {
        // 녹음 완료 시 필요한 로직 (선택사항)
        console.log('녹음 완료:', audioBlob);
    };

    return (
        <Container className={"py-4"}>
            <PageHeader title={"목소리 등록"}/>

            <ul className={"mb-4"}>
                {voiceCloningAgreementScript.map((line, index) => (
                    <li
                        key={index}
                        style={{textDecoration: "none"}}
                    >
                        {line}</li>
                ))}
            </ul>

            <p className={"text-center mb-4"}>
                위 내용을 충분히 이해하고 동의하신 후, 녹음을 시작해주세요.
            </p>

            <VoiceRecorder
                onSubmit={handleVoiceSubmit}
                onRecordingComplete={handleRecordingComplete}
                showPreview={true}
                showReRecord={true}
                recordButtonText="녹음 시작"
                stopButtonText="녹음 중지"
                reRecordButtonText="다시 녹음"
                previewButtonText="미리듣기"
                stopPreviewButtonText="정지"
                submitButtonText="등록하기"
                modalTitle="음성 등록"
                nameLabel="음성 이름"
                namePlaceholder="음성 파일 이름을 입력하세요"
                confirmButtonText="확인"
                cancelButtonText="취소"
                buttonSize="lg"
                className="mt-4"
            />
        </Container>
    );
};

export default VoiceRegisterPage;