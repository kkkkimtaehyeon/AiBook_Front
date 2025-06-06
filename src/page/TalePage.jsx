import {Button, Card, Col, Container, Nav, NavItem, Row} from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
import Footer from "../layout/Footer.jsx";
import "react";
import StorySearchBarComponent from "../components/StorySearchBarComponent.jsx";
import StoryListComponent from "../components/StoryListComponent.jsx";
import PaginationComponent from "../components/PaginationComponent.jsx";
import {useEffect, useState} from "react";
import {useGoToStoryDetail} from "../utils/goToStoryDetail.js";
import axios from "axios";
import SortingButtonGroupComponent from "../components/SortingButtonGroupComponent.jsx";
import Footer2 from "../layout/Footer2.jsx";

const TalePage = () => {
    const goToStoryDetail = useGoToStoryDetail();
    const [storyList, setStoryList] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [tagOn, setTagOn] = useState(false);
    const dummyTags = ["액션", "로맨스", "코디미", "스릴러"]
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchStoryList();
        fetchTags();
    }, [searchParams]);

    useEffect(() => {
        if (!tagOn) {
            searchParams.set("tagId", "");
            setSearchParams(searchParams);
        }
    }, [tagOn]);

    // 동화 리스트 조회
    const fetchStoryList = () => {
        const params = searchParams.toString();

        axios.get(`http://localhost:8080/api/stories?${params}`)
            .then(response => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching stories:", error);
            });
    }

    // 태그 리스트 조회
    const fetchTags = () => {
        axios.get("http://localhost:8080/api/tags")
            .then(res => {
                if (res.status === 200) {
                    setTags(res.data.data);
                }
            })
            .catch(error => {
                console.error("Error fetching tags:", error);
            })
    }

    const tagToggle = () => {
        setTagOn(!tagOn);

    }

    const handleTagParam = (tagId) => {
        setTagOn(true);
        searchParams.set("tagId", tagId);
        setSearchParams(searchParams);
    }

    return (
        <>
            <Container className="main-container" style={{display: "grid"}}>
                <Row className={"d-flex mb-3"}>
                    <Col>
                        <Nav className="w-auto nav-pills">
                            <NavItem>
                                <Link to={"/"} className="nav-link active" aria-current="page">홈</Link>
                            </NavItem>
                            <NavItem>
                                <Link to={"/tale"} className="nav-link">동화</Link>
                            </NavItem>
                        </Nav>
                    </Col>
                    {/*<Col>*/}
                    {/*    <StorySearchBarComponent/>*/}
                    {/*</Col>*/}
                    <Col className={"d-flex justify-content-end"}>
                        <Button as={Link} to={"/story/new"} className="create-story-button">
                            동화 만들기
                        </Button>
                    </Col>
                </Row>
                <Row className="hero-section">
                    <Card className="create-story-card">
                        <div className="create-story-content">
                            <h3 className="create-story-title">나만의 이야기를 직접 동화로 만들어 보세요!</h3>
                            <p className="create-story-subtitle">AI가 당신의 상상력을 아름다운 동화로 변환해 드립니다</p>
                        </div>
                        <div className="create-story-decoration"></div>
                    </Card>
                </Row>

                {/* 검색창 */}
                <Row className={"d-flex justify-content-center"}>
                    <div>
                        <StorySearchBarComponent/>
                    </div>

                </Row>

                {/*정렬*/}
                <Row className="d-flex justify-content-end mb-2">
                    <div className={"w-auto p-0"}>
                        <Button
                            className={"btn-light"}
                            onClick={() => tagToggle()}
                        >
                            장르별</Button>
                    </div>
                    <SortingButtonGroupComponent/>
                </Row>

                {/*장르 태그*/}
                <Row>
                    {tagOn && tags !== null ? (
                            <div className={"mb-2"}>
                                {tags.map((tag, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleTagParam(tag.id)}
                                    >
                                        #{tag.name}
                                    </Button>
                                ))}
                            </div>
                        ) :
                        null
                    }
                < /Row>


                {/* 스토리 리스트 */}
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    <StoryListComponent
                        storyList={storyList}
                        clickHandler={goToStoryDetail}
                        handleTagParam={handleTagParam}
                    />
                </Row>

                {/* 페이지네이션 */}
                <Row className="mt-4">
                    <PaginationComponent
                        totalPages={totalPages}
                    />
                </Row>
            </Container>
            {/*<Footer2 />*/}
            <Footer/>
        </>
    )
}

export default TalePage;