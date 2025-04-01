import {useEffect, useState} from "react";
import jwtAxios from "../../common/JwtAxios.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useGoToStoryDetail} from "../../utils/goToStoryDetail.js";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import StoryListComponent from "../../components/StoryListComponent.jsx";
import StorySearchBarComponent from "../../components/StorySearchBarComponent.jsx";
import SortingComponent from "../../components/SortingComponent.jsx";

const MyStoryList = () => {
    const navigate = useNavigate();
    const goToStoryDetail = useGoToStoryDetail();
    const [storyList, setStoryList] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchParams] = useSearchParams();

    const fetchMyStoryList = () => {
        const params = searchParams.toString();
        jwtAxios.get(`http://localhost:8080/api/stories/my?${params}`)
            .then((response) => {
                const responseData = response.data;
                if (responseData.success) {
                    setStoryList(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                } else {
                    //
                }

            })
            .catch(error => {
                console.log(error);
                if (error.status === 401 || error.status === 403) {
                    alert("로그인이 필요한 서비스입니다.");
                    navigate("/login");
                }
            });
    }

    useEffect(() => {
        fetchMyStoryList();
    }, [searchParams]);


    return (
        <Container>
            <Row className="g-4">
                <StorySearchBarComponent/>
                <SortingComponent/>
                {storyList === null || storyList.length === 0 ? (
                    <p>아직 동화가 없습니다.</p>
                ) : (
                    <StoryListComponent storyList={storyList} clickHandler={goToStoryDetail}/>
                )}
                <PaginationComponent
                    totalPages={totalPages}
                />
            </Row>
        </Container>
    );


}

export default MyStoryList;