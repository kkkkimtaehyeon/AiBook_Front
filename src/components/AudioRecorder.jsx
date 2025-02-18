import {useEffect, useRef, useState} from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import useRecordStore from "../store/useRecordStore"; // Zustand 스토어 가져오기

const AudioRecorder = ({ pageNumber }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const { saveRecording } = useRecordStore();

    // 페이지가 바뀔 때마다 오디오 초기화
    useEffect(() => {
        setIsRecorded(false);
        setIsRecording(false);
        setAudioURL(null);
        mediaRecorderRef.current = null;
        audioChunksRef.current = [];
    }, [pageNumber]);

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
                saveRecording(pageNumber, audioBlob); // Zustand에 저장
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
            {isRecording && (
                <div>
                    <Spinner variant="danger" animation="grow" size="sm" className="me-2" />
                    녹음 중...
                </div>
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
                    <h3>미리 듣기</h3>
                    <audio controls src={audioURL} className="w-30"></audio>
                </div>
            )}
        </Container>
    );
};

export default AudioRecorder;
