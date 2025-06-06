import {Button, Card, Container, FormControl, Spinner} from "react-bootstrap";
import {useEffect, useRef, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {useNavigate} from "react-router-dom";
import "/src/css/page/voiceCloning.css"
import "/src/css/global.css"

const VoiceCloning = () => {
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isRecorded, setIsRecorded] = useState(false);
    const [currentAudioBlob, setCurrentAudioBlob] = useState(null);
    const [voiceName, setVoiceName] = useState("");
    const [story, setStory] = useState({})
    const [currentPage, setCurrentPage] = useState(-1);
    const navigate = useNavigate();
    const [isCloning, setIsCloning] = useState(false);
    const voiceCloningAgreementScript = [
        '안녕하세요. 본인은 지금부터 제공하는 문장을 읽음으로써, 자신의 목소리를 복제하는 데 동의합니다.',
        '저는 이 녹음이 인공지능 기술을 활용해 저의 음성을 학습하고, 그 결과로 생성된 가상 음성이 다양한 서비스에 활용될 수 있음을 이해합니다.',
        '해당 목소리는 본인의 허락 없이 제3자에게 제공되지 않으며, 개인정보 보호를 위한 기술적, 관리적 조치를 충분히 이해하고 동의합니다.',
        '이 목소리 복제는 언제든 철회 요청이 가능하며, 철회 시 더 이상 사용되지 않음을 확인합니다.',
        '지금부터 저는 이 모든 내용에 동의하며, 아래 문장을 읽겠습니다.',
        '"저는 제 목소리를 복제하는 것에 동의하며, 이 목소리가 인공지능 기술로 활용되는 것에 동의합니다."']
    const pageLength = voiceCloningAgreementScript.length;
    const [allRecordings, setAllRecordings] = useState(Array(pageLength).fill(null)); // Store all 10 recordings

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
        if (currentPage >= 0 && currentPage < pageLength) {
            setIsCloning(true);
        } else {
            setIsCloning(false);
        }
    }, [currentPage]);

    const getScript = () => {
        if (currentPage === -1) {
            return <p>
                다음 버튼을 눌러 목소리 복제를 위해 다음 내용을 녹음해주세요!<br/><br/>
                안녕하세요. 본인은 지금부터 제공하는 문장을 읽음으로써,자신의 목소리를 복제하는 데 동의합니다.<br/>
                저는 이 녹음이 인공지능 기술을 활용해 저의 음성을 학습하고, 그 결과로 생성된 가상 음성이 다양한 서비스에 활용될 수 있음을 이해합니다.<br/>
                해당 목소리는 본인의 허락 없이 제3자에게 제공되지 않으며, 개인정보 보호를 위한 기술적, 관리적 조치를 충분히 이해하고 동의합니다.<br/>
                이 목소리 복제는 언제든 철회 요청이 가능하며, 철회 시 더 이상 사용되지 않음을 확인합니다.<br/>
                지금부터 저는 이 모든 내용에 동의하며, 아래 문장을 읽겠습니다.<br/>
                "저는 제 목소리를 복제하는 것에 동의하며, 이 목소리가 인공지능 기술로 활용되는 것에 동의합니다."<br/>
            </p>
        }
        return voiceCloningAgreementScript[currentPage];
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
                    <p>{currentPage + 1 + "/" + pageLength}</p>
                </>);
        }
    }

    // 녹음 시작
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

    // 녹음 중단
    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const areAllPagesRecorded = () => {
        return allRecordings.every(recording => recording !== null);
    }

    const upload = () => {
        if (!areAllPagesRecorded()) {
            alert("모든 페이지를 녹음해야 합니다.");
            return;
        }

        const url = 'http://localhost:8080/api/voices';
        const formData = new FormData();

        const mergedBlob = new Blob(allRecordings, {type: "audio/wav"});
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

                    </> : null}
                </Card.Body>

                {currentPage === pageLength ? (
                    <div>
                        {!areAllPagesRecorded() && (
                            <p className="text-danger mt-2">모든 페이지를 녹음해야 합니다.</p>
                        )}

                        <FormControl
                            value={voiceName}
                            onChange={(e) => setVoiceName(e.target.value)}
                            placeholder="ex) 아빠 목소리...."
                            className="mb-3 text-center"
                            required
                        />
                    </div>
                ) : null}

                <div className="mt-3 d-flex justify-content-between">
                    <Button onClick={toPrevPage} disabled={currentPage <= -1}>이전</Button>
                    {getCurrentPage()}
                    {currentPage === voiceCloningAgreementScript.length ? (
                            <Button
                                onClick={upload}
                                disabled={!areAllPagesRecorded() || !voiceName}
                            >
                                등록
                            </Button>) :
                        <Button onClick={toNextPage}
                                disabled={currentPage >= pageLength || (isCloning && !isRecorded)}
                        >다음
                        </Button>
                    }
                </div>
            </Card>
        </Container>
    );
};

export default VoiceCloning;