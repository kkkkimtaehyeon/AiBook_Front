import {Button, Card, Container, FormControl, Spinner} from "react-bootstrap";
import {useRef, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";

const VoiceCloning = () => {
    const [scriptLine, setScriptLine] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [currentAudioBlob, setCurrentAudioBlob] = useState(null);
    const [voiceName, setVoiceName] = useState("");
    const navigate = useNavigate();

    const script = [
        "녹음 버튼을 누르고 아래의 문장을 읽어주세요!" +
        "안녕하세요! 저는 동화를 더욱 생동감 있게 들려드리기 위해, 제 목소리를 녹음하고 있습니다." +
        "이 음성 샘플을 활용하여, 제가 직접 녹음하지 않아도 제 목소리로 동화를 읽어주는 기능을 만들 수 있어요." +
        "저는 제 음성을 복제하는 것에 동의하며, 이를 통해 더욱 몰입감 있는 동화를 경험할 수 있기를 기대합니다." +
        "자, 이제 다양한 말하기 방식을 연습해볼까요?" +
        "기쁠 땐 이렇게 말할 수 있어요! \"우와! 정말 신나는 모험이야!\"" +
        "슬플 땐, \"정말 슬픈 이야기네요...\"" +
        "천천히, 조용히 말하면 이런 느낌이 나겠죠? \"쉿, 모두가 잠든 것 같아요.\"" +
        "마지막으로, 제 목소리가 잘 반영되었을까요? 이제 마법 같은 동화 속으로 함께 떠나볼까요?"
    ];

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            }

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {type: "audio/wav"});
                setCurrentAudioBlob(audioBlob);
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                audioChunksRef.current = [];
                setIsRecorded(true);
            };

            mediaRecorderRef.current.start();
            setCurrentAudioBlob(null);
            setIsRecording(true);
            setIsRecorded(false);
        } catch (error) {
            console.error("마이크 접근 실패", error);
        }
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const upload = () => {
        if (currentAudioBlob !== null) {
            const url = 'http://localhost:8080/api/voices'
            const formData = new FormData();
            formData.append("audioFile", currentAudioBlob, "recording.wav");
            formData.append("name", voiceName);
            jwtAxios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(response => {
                    if (response.data.success) {
                        console.log("목소리가 등록되었습니다.");
                        navigate("/my/voices");
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } else {
            alert("먼저 녹음을 해주세요.");
        }
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{width: "60%", padding: "20px"}}>
                <Card.Body>
                    <Card.Title className="mb-3">🎙️ 내 목소리로 동화 읽기</Card.Title>
                    <Card.Text>
                        <p>{script[scriptLine]}</p>
                    </Card.Text>
                    {isRecording && (
                        <div>
                            <Spinner variant="danger" animation="grow" size="sm" className="me-2"/>
                            녹음 중...
                        </div>
                    )}

                    <div className="mt-3">
                        <Button
                            onClick={isRecording ? stopRecording : startRecording}
                            variant={isRecording ? "danger" : "success"}
                            className="px-4"
                        >
                            {isRecording ? "녹음 정지" : isRecorded ? "다시 녹음" : "녹음"}
                        </Button>
                    </div>

                    {audioURL && (
                        <div className="mt-4">
                            <h3>미리 듣기</h3>
                            <audio controls src={audioURL} className="w-30"></audio>
                        </div>
                    )}
                    <FormControl
                        value={voiceName}
                        onChange={(e) => setVoiceName(e.target.value)}
                        placeholder="목소리의 이름을 입력해주세요."
                        className="mb-3 text-center" required/>

                </Card.Body>
                <Button onClick={upload}>등록</Button>
            </Card>
        </Container>
    );
};

export default VoiceCloning;
