import {Button, Card, Container, FormControl, Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";

const VoiceCloning = () => {
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [currentAudioBlob, setCurrentAudioBlob] = useState(null);
    const [allRecordings, setAllRecordings] = useState(Array(10).fill(null)); // Store all 10 recordings
    const [voiceName, setVoiceName] = useState("");
    const [story, setStory] = useState({})
    const [currentPage, setCurrentPage] = useState(-1);
    const navigate = useNavigate();
    const [isCloning, setIsCloning] = useState(false);

    const fetchLatestStory = () => {
        const url = "http://localhost:8080/api/stories/my/latest";
        jwtAxios.get(url)
            .then(response => {
                if (response.data.success) {
                    if (response.data.data === null) {
                        alert("보이스 클로닝을 하기 위해서 먼저 동화를 만들어주세요.");
                        navigate("/story/new");
                    } else {
                        setStory(response.data.data);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        fetchLatestStory();
    }, []);

    useEffect(() => {
        if (currentPage >= 0 && currentPage <= 9) {
            setIsCloning(true);
        } else {
            setIsCloning(false);
        }
    }, [currentPage]);

    const getScript = () => {
        if (currentPage === -1) {
            return "목소리를 복제하여 동화를 생동감있게 더빙할 수 있습니다!\n 다음 버튼을 눌러 목소리 복제를 시작하세요.";
        }
        if (currentPage === 10) {
            return "목소리의 이름을 설정해주세요.";
        }
        if (isCloning) {
            return story.pages[currentPage].content;
        }
    }

    const toNextPage = () => {
        if (currentPage < 10) {
            // Save current recording before moving to next page
            if (currentPage >= 0 && currentAudioBlob) {
                const newRecordings = [...allRecordings];
                newRecordings[currentPage] = currentAudioBlob;
                setAllRecordings(newRecordings);
            }

            // Reset current recording state
            setCurrentAudioBlob(null);
            setAudioURL(null);
            setIsRecorded(false);

            // Move to next page
            setCurrentPage(currentPage + 1);
        }
    }

    const toPrevPage = () => {
        if (currentPage >= 0) {
            // Save current recording before moving to previous page
            if (currentAudioBlob) {
                const newRecordings = [...allRecordings];
                newRecordings[currentPage] = currentAudioBlob;
                setAllRecordings(newRecordings);
            }

            // Set current recording to the previous page's recording
            const prevPageRecording = allRecordings[currentPage - 1];
            if (prevPageRecording) {
                setCurrentAudioBlob(prevPageRecording);
                setAudioURL(URL.createObjectURL(prevPageRecording));
                setIsRecorded(true);
            } else {
                setCurrentAudioBlob(null);
                setAudioURL(null);
                setIsRecorded(false);
            }

            setCurrentPage(currentPage - 1);
        }
    }

    const getCurrentPage = () => {
        if (isCloning) {
            return (
                <>
                    <p>{currentPage + 1 + "/10"}</p>
                    <p>녹음 버튼을 누르고 아래 문장을 읽어주세요</p>
                </>);
        }
    }

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

                // Save recording for current page
                const newRecordings = [...allRecordings];
                newRecordings[currentPage] = audioBlob;
                setAllRecordings(newRecordings);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("마이크 접근 실패", error);
        }
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    // Check if all pages have been recorded
    const areAllPagesRecorded = () => {
        return allRecordings.every(recording => recording !== null);
    }

    const upload = () => {
        // Check if all pages are recorded
        if (!areAllPagesRecorded()) {
            alert("모든 페이지를 녹음해야 합니다.");
            return;
        }

        // Create a single combined FormData with all recordings
        const url = 'http://localhost:8080/api/voices';
        const formData = new FormData();

        // Append each recording with a unique name
        // allRecordings.forEach((recording, index) => {
        //     formData.append(`audioFile${index}`, recording, `recording${index}.wav`);
        // });
        const mergedBlob = new Blob(allRecordings, { type: "audio/wav" });
        formData.append("audioFile", mergedBlob, "merged_recording.wav");
        formData.append("name", voiceName);

        jwtAxios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                if (response.data.success) {
                    alert("목소리가 등록되었습니다.");
                    navigate("/my/voices");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{width: "60%", padding: "20px"}}>
                {getCurrentPage()}

                <Card.Body>
                    <Card.Text>
                        <p>{getScript()}</p>
                    </Card.Text>
                    {isCloning ? <>
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

                        {/* Display recording completion status */}
                        <div className="mt-3">
                            <p>녹음 완료: {allRecordings.filter(r => r !== null).length}/10</p>
                        </div>
                    </> : null}
                </Card.Body>

                {currentPage === 10 ? (
                    <div>
                        <FormControl
                            value={voiceName}
                            onChange={(e) => setVoiceName(e.target.value)}
                            placeholder="ex) 아빠 목소리...."
                            className="mb-3 text-center"
                            required
                        />

                        <Button
                            onClick={upload}
                            disabled={!areAllPagesRecorded() || !voiceName}
                        >
                            등록
                        </Button>

                        {!areAllPagesRecorded() && (
                            <p className="text-danger mt-2">모든 페이지를 녹음해야 합니다.</p>
                        )}
                    </div>
                ) : null}

                <div className="mt-3 d-flex justify-content-between">
                    <Button onClick={toPrevPage} disabled={currentPage <= -1}>이전</Button>
                    <Button onClick={toNextPage} disabled={currentPage >= 10 || (isCloning && !isRecorded)}>다음</Button>
                </div>
            </Card>
        </Container>
    );
};

export default VoiceCloning;