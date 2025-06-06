import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {Button, Card, Col, Container, Dropdown, Row} from "react-bootstrap"
import {ThreeDots} from "react-bootstrap-icons"
import jwtAxios from "../../common/JwtAxios.js";
import PageHeader from "../../newComponents/PageHeader.jsx";
import "/src/css/dropdown.css"
import axios from "axios";
import AudioPlayerComponent from "../../components/AudioPlayerComponent.jsx";

const StoryDubbingReadPage = () => {
    const navigate = useNavigate()
    const [storyDetail, setStoryDetail] = useState({})
    const [pageNumber, setPageNumber] = useState(0)
    const {storyDubbingId} = useParams();
    const [currentPage, setCurrentPage] = useState({});

    const fetchStoryDubbingDetail = async () => {
        await axios.get(`http://localhost:8080/api/stories/dubbed-stories/${storyDubbingId}`)
            .then((res) => {
                if (res.status === 200) {
                    setStoryDetail(res.data.data);
                }
            })
            .catch(error => console.log(error));

    }
    useEffect(() => {
        fetchStoryDubbingDetail();
    }, []);

    const goToNextPage = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1)
            setCurrentPage(storyDetail.pages[pageNumber]);
        }
    }

    const goBackToPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
            setCurrentPage(storyDetail.pages[pageNumber]);
        }
    }
    const deleteStoryDubbing = () => {
        jwtAxios.delete(`http://localhost:8080/api/dubbed-stories/${storyDubbingId}`)
            .then((response) => {
                if (response.status === 204) {
                    alert("동화가 삭제되었습니다.")
                    navigate("/home");

                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const DropdownIcon = () => (
        <Dropdown className="dropdown">
            <Dropdown.Toggle as="span" className="p-0 border-0 text-dark">
                <ThreeDots size={24}/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={() => deleteStoryDubbing()}>삭제</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    return (
        <Container className="py-4">
            <PageHeader
                title={storyDetail.title}
                rightIcon={DropdownIcon}
            />

            <Row>
                <Card className="story-content-card" style={{height: "450px"}}>
                    {pageNumber === 0 ? (
                        <div className="story-cover">
                            <h1 className="story-title">{storyDetail.title}</h1>
                            <div className="story-author">글쓴이 {storyDetail.author}</div>
                            <div className="story-cover-decoration"></div>
                        </div>
                    ) : (
                        (() => {
                            // const currentPage = storyDetail.pages?.find((page) => page.pageNumber === pageNumber) || {}
                            return (
                                <div className="story-page">
                                    <p className="story-content">{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
                                </div>
                            )
                        })()
                    )}
                </Card>
            </Row>

            <Row>
                <AudioPlayerComponent audioUrl={currentPage.audioUrl}/>
            </Row>

            <Row>
                <div className="pagination-controls d-flex justify-content-between align-items-center">
                    <Col>
                        {pageNumber > 0 && (
                            <Button onClick={goBackToPage} className="page-button prev-button">
                                <span className="ms-2">이전</span>
                            </Button>
                        )}
                    </Col>
                    <Col>
                        <div className="page-indicator">{pageNumber}/10</div>
                    </Col>
                    <Col>
                        {pageNumber < 10 && (
                            <Button onClick={goToNextPage} className="page-button next-button">
                                <span>다음</span>
                            </Button>
                        )}
                    </Col>
                </div>
            </Row>
        </Container>
    )
}

export default StoryDubbingReadPage;

