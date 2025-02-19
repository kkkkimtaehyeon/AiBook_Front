import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Container, Row} from "react-bootstrap";
import jwtAxios from "../common/JwtAxios.js";
import useRecordStore from "../store/useRecordStore"; // Zustand 저장소 가져오기
import AudioRecorder from "../components/AudioRecorder.jsx";

const StoryDubbing = () => {
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const {recordings, clearRecordings} = useRecordStore(); // 녹음 데이터 가져오기
    const navigate = useNavigate();

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


    useEffect(() => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    setStoryDetail(response.data.data);
                }
            })
            .catch(error => console.log(error));
    }, [storyId]);

    useEffect(() => {
        console.log("recordings: ", recordings);
    }, [pageNumber]);

    const goToNextPage = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1);
        }
    };

    const goBackToPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <Container>
            <Row>
                {pageNumber === 0 ? (
                    <Card style={{width: "100%", height: "500px"}}>
                        <h1>{storyDetail.title}</h1>
                        <span>글쓴이 {storyDetail.author}</span>
                    </Card>
                ) : (
                    (() => {
                        const currentPage = storyDetail.pages?.find(page => page.pageNumber === pageNumber) || {};
                        return (
                            <>
                                <Card style={{width: "100%", height: "500px"}}>
                                    <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
                                    <AudioRecorder pageNumber={pageNumber}/>
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
};

export default StoryDubbing;
