import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Button, Card, Col, Container, Dropdown, FormControl, InputGroup, Row} from "react-bootstrap";
import Footer from "../layout/Footer.jsx";
import StoryList from "../components/StoryList.jsx";

function Index() {
    const [storyList, setStoryList] = useState([]);
    const searchKeyRef = useRef(null);
    const [selectedSortOption, setSelectedSortOption] = useState(0);
    const sortOptions = ["최신순", "오래된순", "조회수 높은순", "조회수 낮은순", "좋아요 많은 순", "좋아요 적은순"];


    useEffect(() => {
        axios.get("http://localhost:8080/api/stories")
            .then((response) => {
                console.log(response.data.data);
                setStoryList(response.data.data.content);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const searchStory = () => {
        const searchKey = searchKeyRef.current.value;
        axios.get(`http://localhost:8080/api/stories?searchTarget=title&searchKey=${searchKey}`)
            .then(response => {
                setStoryList(response.data.data.content);
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                                {sortOptions.at(selectedSortOption)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {sortOptions.map((option, index) => (
                                    <Dropdown.Item
                                        key={index}
                                        onClick={() => setSelectedSortOption(index)}
                                    >
                                        {option}
                                    </Dropdown.Item>)
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    <StoryList storyList={storyList} />
                </Row>
            </Container>
            <Footer/>
        </>
    );
}

export default Index;
