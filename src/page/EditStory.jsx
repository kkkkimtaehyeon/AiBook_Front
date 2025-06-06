import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Card, Container, Form, FormControl, Row} from "react-bootstrap";
import {Eye, Heart, HeartFill, Pause, Play} from 'react-bootstrap-icons';
import jwtAxios from "../common/JwtAxios.js";
import useLoginStore from "../store/useLoginStore.js";
import AudioRecorder from "../components/AudioRecorder.jsx";
import useRecordStore from "../store/useRecordStore.js";

const EditDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const {isLogin, memberId} = useLoginStore();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [title, setTitle] = useState("");
    const {recordings, clearRecordings} = useRecordStore(); // 녹음 데이터 가져오기

    const fetchStory = () => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                    setIsLiked(response.data.data.liked);
                    setTitle(response.data.data.title);
                }
            })
            .catch(error => console.log(error));
    }
    
    useEffect(() => {
        fetchStory();
    }, [storyId]);

    const editTitle = () => {
        const data = {
            title: title
        }
        jwtAxios.patch(`http://localhost:8080/api/stories/${storyId}`, data)
            .then(response => {
                if (response.data.success) {
                    alert("제목이 수정되었습니다!");
                    navigate(`/stories/${storyId}`);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <Container style={{display: "grid"}}>
            <Row className="text-start mb-3">
                <div>
                    {isLogin && memberId === storyDetail.memberId ?
                        <div className="d-inline-block mx-2">
                            <Button as={Link} to={`/stories/${storyId}`}>수정 취소</Button>
                        </div> : null
                    }
                </div>
            </Row>
            <Row>
                <Card style={{ width: "100%", height: "500px", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <Form style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <FormControl
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ fontSize: "2rem", textAlign: "center", width: "80%" }}
                            />
                        </div>
                        <Button
                            onClick={editTitle}
                            style={{ marginTop: "10px" }}
                        >
                            제목 수정
                        </Button>
                    </Form>
                    <span style={{ marginTop: "10px", fontSize: "1.2rem" }}>글쓴이 {storyDetail.author}</span>
                </Card>
            </Row>
        </Container>
    );
}

export default EditDetail;