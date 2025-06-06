import {Link, useNavigate} from "react-router-dom";
import {Carousel, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {api} from "../../common/CustomAxios.js";


const HomePage = () => {
    const [newStories, setNewStories] = useState([]);
    const [hotStories, setHotStories] = useState([]);
    const imageLoadingUrl = "/src/assets/image_loading.jpg";
    const navigate = useNavigate();

    useEffect(() => {
        fetchLatestStories();
        fetchHotStories();
    }, []);

    function fetchLatestStories() {
        api.get(`/api/stories?size=7&sortBy=createdAt&sortDir=desc`)
            .then(res => {
                if (res.status === 200) {
                    setNewStories(res.data.data.content);
                }

            })
            .catch(error => {
                console.error("Error fetching stories:", error);
            });
    }

    function fetchHotStories() {
        api.get(`/api/stories?size=3&sortBy=likeCount&sortDir=desc`)
            .then(res => {
                if (res.status === 200) {
                    setHotStories(res.data.data.content);
                }
            })
            .catch(error => {
                console.error("Error fetching hot stories:", error);
            });
    }

    function goToStoryDetail(storyId) {
        navigate(`/stories/${storyId}`);
    }

    const getImageUrl = (story) => {
        return story.coverImageUrl ? story.coverImageUrl : imageLoadingUrl;
    }

    return (
        <Container className="py-4">
            {/*네이게이션*/}
            <Row>
                <ul className="nav">
                    <li className="nav-item">
                        <Link to={"/home"} style={{color: "black"}} className="nav-link">홈</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/discovery"} style={{color: "black"}} className="nav-link">동화</Link>
                    </li>
                </ul>
                <hr/>
            </Row>

            {/*인기*/}
            <Row style={{marginTop: "20px", height: "530px"}} xs={1} >
                <h1 className={"mb-5"} style={{textAlign: "left"}}>가장 인기있는 동화</h1>
                <Carousel
                    interval={3000} className={"text-start"}>
                    {hotStories.map((hotStory) => (
                        <Carousel.Item
                            key={hotStory.storyId}
                            onClick={() => goToStoryDetail(hotStory.storyId)}
                        >
                            <img
                                src={getImageUrl(hotStory)}
                                alt="img"
                                className="d-block w-100 rounded-5"
                                style={{height: '330px', objectFit: 'cover'}}
                            />
                            <h4>{hotStory.title}</h4>
                            <p>{hotStory.writer}</p>
                            {/* 태그 버튼 렌더링 (원할 경우 활성화) */}
                            <div>
                                {hotStory.tags?.map((tag, index) => (
                                    <button
                                        className="tag-btn"
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // handleTagParam(tag.id);
                                        }}
                                    >
                                        # {tag.name}
                                    </button>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Row>

            {/*최신*/}
            <Row className={"mb-5"} style={{marginTop: "30px"}}>
                <h1 className={"mb-5"} style={{textAlign: "left"}}>방금 업로드된 동화</h1>
                <Row xs={2} sm={2} md={3} lg={4} xl={4}>
                    {newStories.map((newStory) => (
                        <Col
                            className={"text-start mb-4"}
                            key={newStory.storyId}
                            onClick={() => goToStoryDetail(newStory.storyId)}
                        >
                            <img
                                src={getImageUrl(newStory)}
                                alt={newStory.title}
                                className="img-fluid rounded-4 mb-2"
                                style={{height: "auto", width: "100%"}}
                            />
                            <div className={"mt-2"}>
                                <h4>{newStory.title}</h4>
                                <span>{newStory.writer}</span>
                                {newStory.tags !== null ? (
                                        <div>
                                            {newStory.tags.map((tag) => (
                                                <button
                                                    key={tag.id}
                                                    className={"tag-btn"}
                                                    onClick={(e) => {
                                                        e.stopPropagation();         // 카드 클릭 이벤트 차단
                                                        // handleTagParam(tag.id);      // 태그 클릭 동작 수행
                                                    }}
                                                >
                                                    # {tag.name}
                                                </button>
                                            ))}
                                        </div>) : null
                                }

                            </div>
                        </Col>
                    ))}
                </Row>
            </Row>


        </Container>
    );

}

export default HomePage;