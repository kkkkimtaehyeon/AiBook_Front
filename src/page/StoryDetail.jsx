import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Container} from "react-bootstrap";
import {ArrowLeftSquare, ArrowLeftSquareFill, ArrowRightSquareFill} from 'react-bootstrap-icons';

const StoryDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                }
            })
            .catch(error => console.log(error));
    }, [pageNumber]);

    const goToNextPage = () => {
        const nextPageNumber = Number(pageNumber) + 1;
        if (nextPageNumber <= 10) {
            setPageNumber(nextPageNumber);
        }
    }

    const goBackToPage = () => {
        const nextPageNumber = Number(pageNumber) - 1;
        if (nextPageNumber >= 0) {
            setPageNumber(nextPageNumber);

        }
    }

    const storyCover = () => {
        return (
            <Card style={{width: "100%", height: "500px"}}>
                <h1>{storyDetail.title}</h1>
                <span>글쓴이 {storyDetail.author}</span>
            </Card>
        );
    }

    const storyPage = () => {
        const currentPage = storyDetail.pages?.find(page => page.pageNumber === Number(pageNumber)) || {};

        return (
            <>
                <Card style={{width: "100%", height: "500px"}}>
                    <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
                </Card>
                <p>{currentPage.pageNumber || 0}/10</p>
            </>
        );
    };

    return (
        <Container>
            {Number(pageNumber) === 0 ? storyCover() : storyPage()}

            <div>
                {pageNumber > 1 ? (<Button onClick={goBackToPage}>이전</Button>) : null}
                {pageNumber < 10 ? (<Button onClick={goToNextPage}>다음</Button>) : null}
            </div>
            <Link to={"/"}>목록보기</Link>
        </Container>
    );
}

export default StoryDetail;