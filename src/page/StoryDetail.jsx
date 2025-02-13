import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Container} from "react-bootstrap";
import {Heart, HeartFill} from 'react-bootstrap-icons';
import jwtAxios from "../common/JwtAxios.js";

const StoryDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                    setIsLiked(response.data.data.liked);
                }
            })
            .catch(error => console.log(error));
    }, [storyId]); // pageNumber 제거, storyId로 변경

    const goToNextPage = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1);
        }
    }

    const goBackToPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    const likeStory = () => {
        const newIsLiked = !isLiked; // 현재 상태와 반대로 설정
        setIsLiked(newIsLiked); // UI 상태 먼저 업데이트

        jwtAxios.post(`http://localhost:8080/api/stories/${storyId}/like`)
            .then((response) => {
                if (!response.data.success) {
                    setIsLiked(isLiked); // 실패하면 원래 상태로 복원
                    alert("좋아요가 실패했습니다.");
                }
            })
            .catch(error => {
                setIsLiked(isLiked); // 실패하면 원래 상태로 복원
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                } else {
                    alert("좋아요가 실패했습니다.");
                }
            });
    }

    return (
        <Container>
            <Button as={Link} to={"/"}>목록보기</Button>
            <Button onClick={likeStory} variant="light">
                {isLiked ? <HeartFill color="red" size={20} /> : <Heart size={20} />}
            </Button>
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
                            </Card>
                            <p>{currentPage.pageNumber || 0}/10</p>
                        </>
                    );
                })()
            )}

            <div>
                {pageNumber > 0 && <Button onClick={goBackToPage}>이전</Button>}
                {pageNumber < 10 && <Button onClick={goToNextPage}>다음</Button>}
            </div>
        </Container>
    );
}

export default StoryDetail;
