import { useState, useRef } from "react";
import { Button, Alert, Spinner, Container } from "react-bootstrap";

const AudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                audioChunksRef.current = [];
                setIsRecorded(true);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setIsRecorded(false);
        } catch (error) {
            console.error("마이크 접근 실패:", error);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    return (
        <Container className="text-center mt-4">
            <h2>음성 녹음</h2>

            {/* 녹음 중 표시 (Bootstrap Alert + Spinner) */}
            {isRecording && (
                <Alert variant="danger" className="d-inline-flex align-items-center">
                    <Spinner animation="grow" size="sm" className="me-2" />
                    녹음 중...
                </Alert>
            )}

            <div className="mt-3">
                <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    variant={isRecording ? "danger" : "success"}
                    className="px-4"
                >
                    {isRecording ? "녹음 정지" : isRecorded ? "다시 녹음" : "녹음 시작"}
                </Button>
            </div>

            {audioURL && (
                <div className="mt-4">
                    <h3>녹음된 오디오</h3>
                    <audio controls src={audioURL} className="w-30"></audio>
                </div>
            )}
        </Container>
    );
};

export default AudioRecorder;
