import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row} from "react-bootstrap";
import Footer from "../layout/Footer.jsx";
import StoryList from "../components/StoryList.jsx";
import PaginationComponent from "../components/PaginationComponent.jsx";

function Index() {
    const [storyList, setStoryList] = useState([]);
    const searchKeyRef = useRef(null);
    const [selectedSortOption, setSelectedSortOption] = useState(0);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

    const sortOptions = [
        {
            displayName: "최신순",
            sortBy: "createdAt",
            sortDir: "desc",
        },
        {
            displayName: "오래된순",
            sortBy: "createdAt",
            sortDir: "asc",
        },
        {
            displayName: "조회수 높은순",
            sortBy: "viewCount",
            sortDir: "desc",
        },
        {
            displayName: "조회수 낮은순",
            sortBy: "viewCount",
            sortDir: "asc",
        },
        {
            displayName: "좋아요 많은순",
            sortBy: "likeCount",
            sortDir: "desc",
        },
        {
            displayName: "좋아요 적은순",
            sortBy: "likeCount",
            sortDir: "asc",
        },
    ]

    useEffect(() => {
        const baseUrl = "http://localhost:8080/api/stories";
        let params = new URLSearchParams();
        params.set("page", currentPage);
        // 검색상태 유지
        if (searchKeyRef.current.value !== "") {
            params.set("searchTarget", "title");
            params.set("searchKey", searchKeyRef.current.value);
        }
        params.set("sortBy", sortOptions.at(selectedSortOption).sortBy);
        params.set("sortDir", sortOptions.at(selectedSortOption).sortDir);
        axios.get(baseUrl + "?" + params)
            .then(response => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages); // 전체 페이지 수 저장
            })
            .catch(error => {
                console.log(error);
            })
    }, [selectedSortOption]);

    useEffect(() => {
        fetchStories();
    }, [currentPage]); // 페이지 변경 시 호출

    const fetchStories = () => {
        axios.get(`http://localhost:8080/api/stories?page=${currentPage}`)
            .then((response) => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages); // 전체 페이지 수 저장
            })
            .catch(error => {
                console.log(error);
            });
    };

    const searchStory = () => {
        const searchKey = searchKeyRef.current.value;
        axios.get(`http://localhost:8080/api/stories?searchTarget=title&searchKey=${searchKey}`)
            .then(response => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages); // 검색 후 전체 페이지 수 업데이트
                setCurrentPage(0); // 검색 시 첫 페이지로 이동
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            <Container>
                <Row>
                    <Card>
                        <div>
                            <h3>나만의 이야기를 직접 동화로 만들어 보세요!</h3>
                            <Button as={Link} to={"/story/new"}>동화 만들기</Button>
                        </div>
                    </Card>
                </Row>

                {/* 검색창 및 정렬 */}
                <Row className="mt-3 mb-3">
                    <Col xs={12} md={6}>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="제목 검색"
                                ref={searchKeyRef}
                            />
                            <Button onClick={searchStory}>검색</Button>
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                {sortOptions.at(selectedSortOption).displayName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {sortOptions.map((option, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => setSelectedSortOption(index)}
                                    >
                                        {option.displayName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                {/* 스토리 리스트 */}
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    <StoryList storyList={storyList}/>
                </Row>

                {/* 페이지네이션 */}
                <Row className="mt-4">
                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                    />,
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default Index;
