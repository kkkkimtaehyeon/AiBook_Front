import {useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {Button, Card, Col, Container, Dropdown, Row} from "react-bootstrap"
import {Eye, Heart, HeartFill, ThreeDots} from "react-bootstrap-icons"
import jwtAxios from "../../common/JwtAxios.js";
import PageHeader from "../../newComponents/PageHeader.jsx";
import "/src/css/dropdown.css"
import "/src/css/page/storyDetail.css"

const StoryReadPage = () => {
    const navigate = useNavigate()
    const {storyId} = useParams()
    const [storyDetail, setStoryDetail] = useState({})
    const [pageNumber, setPageNumber] = useState(0)
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        jwtAxios.get(`/api/stories/${storyId}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    setStoryDetail(res.data.data)
                    setIsLiked(res.data.data.liked)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [storyId])

    const goToNextPage = () => {
        if (pageNumber < 10) {
            setPageNumber(pageNumber + 1)
        }
    }

    const goBackToPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    const likeStory = () => {
        const newIsLiked = !isLiked
        setIsLiked(newIsLiked)
        jwtAxios
            .post(`/api/stories/${storyId}/like`)
            .then((response) => {
                if (!response.data.success) {
                    setIsLiked(isLiked)
                    alert("좋아요가 실패했습니다.")
                }
            })
            .catch((error) => {
                setIsLiked(isLiked)
                if (error.response?.status === 401 || error.response?.status === 403) {
                    alert("로그인이 필요한 서비스입니다.")
                    navigate("/login")
                } else {
                    alert("좋아요가 실패했습니다.")
                }
            })
    }

    const deleteStory = () => {
        jwtAxios.delete(`/api/stories/${storyId}`)
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
                <ThreeDots size={24} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {/*<Dropdown.Item>수정</Dropdown.Item>*/}
                <Dropdown.Item onClick={() => deleteStory()}>삭제</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

    );

    return (
        <Container className="py-4" style={{marginBottom: "100px"}}>
            <PageHeader
                title={storyDetail.title}
                rightIcon={DropdownIcon}
            />

            <Row>
                <div className="story-stats">
                    <div className="view-count">
                        <Eye size={18} className="me-2"/>
                        {storyDetail.viewCount || 0}
                    </div>
                    <Button onClick={likeStory} className="like-button">
                        {isLiked ? <HeartFill size={18} className="heart-filled"/> : <Heart size={18}/>}
                    </Button>
                </div>
            </Row>

            <Row>
                <Card className="story-content-card" style={{height: "330px"}}>
                    {pageNumber === 0 ? (
                        <div className="story-cover">
                            <h1 className="story-title">{storyDetail.title}</h1>
                            <div className="story-author">글쓴이 {storyDetail.author}</div>
                            <div className="story-cover-decoration"></div>
                        </div>
                    ) : (
                        (() => {
                            const currentPage = storyDetail.pages?.find((page) => page.pageNumber === pageNumber - 1) || {}
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
                    <Col className={"justify-content-end d-flex"}>
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

export default StoryReadPage;

