// import {Link, useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import {Button, Card, Container, Row} from "react-bootstrap";
// import {Eye, Heart, HeartFill} from 'react-bootstrap-icons';
// import jwtAxios from "../common/JwtAxios.js";
// import useLoginStore from "../store/useLoginStore.js";
//
// const StoryDetail = () => {
//     const navigate = useNavigate();
//     const {storyId} = useParams();
//     const [storyDetail, setStoryDetail] = useState({});
//     const [pageNumber, setPageNumber] = useState(0);
//     const [isLiked, setIsLiked] = useState(false);
//     const {isLogin, memberId} = useLoginStore();
//
//     useEffect(() => {
//         jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
//             .then((response) => {
//                 if (response.data.success) {
//                     console.log(response.data.data);
//                     setStoryDetail(response.data.data);
//                     setIsLiked(response.data.data.liked);
//                 }
//             })
//             .catch(error => console.log(error));
//     }, [storyId]);
//
//     const goToNextPage = () => {
//         if (pageNumber < 10) {
//             setPageNumber(pageNumber + 1);
//         }
//     }
//
//     const goBackToPage = () => {
//         if (pageNumber > 0) {
//             setPageNumber(pageNumber - 1);
//         }
//     }
//
//     const likeStory = () => {
//         const newIsLiked = !isLiked;
//         setIsLiked(newIsLiked);
//
//         jwtAxios.post(`http://localhost:8080/api/stories/${storyId}/like`)
//             .then((response) => {
//                 if (!response.data.success) {
//                     setIsLiked(isLiked);
//                     alert("좋아요가 실패했습니다.");
//                 }
//             })
//             .catch(error => {
//                 setIsLiked(isLiked);
//                 if (error.response?.status === 401 || error.response?.status === 403) {
//                     alert("로그인이 필요한 서비스입니다.");
//                     navigate("/login");
//                 } else {
//                     alert("좋아요가 실패했습니다.");
//                 }
//             });
//     }
//
//     const deleteStory = () => {
//         jwtAxios.delete(`http://localhost:8080/api/stories/${storyId}`)
//             .then(response => {
//                 if (response.data.success) {
//                     alert("동화가 성공적으로 삭제되었습니다.");
//                     navigate("/");
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     return (
//         <Container>
//             <Row>
//                 <div>
//                     <Button as={Link} to={"/"}>목록보기</Button>
//                     {isLogin && memberId === storyDetail.memberId ?
//                         <div className="d-inline-block mx-2">
//                             <Button as={Link} to={`/stories/${storyId}/edit`}>수정</Button>
//                             <Button onClick={deleteStory}>삭제</Button>
//                         </div> : null
//                     }
//
//                     <Eye size={20}></Eye>{storyDetail.viewCount}
//                     <Button onClick={likeStory} variant="light">
//                         {isLiked ? <HeartFill color="red" size={20}/> : <Heart size={20}/>}
//                     </Button>
//                 </div>
//             </Row>
//             <Row>
//                 {pageNumber === 0 ? (
//                     <Card style={{width: "100%", height: "500px"}}>
//                         <h1>{storyDetail.title}</h1>
//                         <span>글쓴이 {storyDetail.author}</span>
//                     </Card>
//                 ) : (
//                     (() => {
//                         const currentPage = storyDetail.pages?.find(page => page.pageNumber === pageNumber) || {};
//                         return (
//                             <>
//                                 <Card style={{width: "100%", height: "500px"}}>
//                                     <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
//                                 </Card>
//                                 <p>{currentPage.pageNumber || 0}/10</p>
//                             </>
//                         );
//                     })()
//                 )}
//
//             </Row>
//             <Row>
//                 <div>
//                     {pageNumber > 0 && <Button onClick={goBackToPage}>이전</Button>}
//                     {pageNumber < 10 && <Button onClick={goToNextPage}>다음</Button>}
//                 </div>
//             </Row>
//         </Container>
//     );
// }
//
// export default StoryDetail;
"use client"

import {Link, useNavigate, useParams} from "react-router-dom"
import {useEffect, useState} from "react"
import {Button, Card, Container} from "react-bootstrap"
import {ArrowLeft, ArrowRight, Eye, Heart, HeartFill} from "react-bootstrap-icons"
import jwtAxios from "../common/JwtAxios.js"
import useLoginStore from "../store/useLoginStore.js"
import "/src/css/page/storyDetail.css"

const StoryDetail = () => {
    const navigate = useNavigate()
    const { storyId } = useParams()
    const [storyDetail, setStoryDetail] = useState({})
    const [pageNumber, setPageNumber] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const { isLogin, memberId } = useLoginStore()

    useEffect(() => {
        jwtAxios.get(`http://localhost:8080/api/stories/${storyId}`)
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
            .post(`http://localhost:8080/api/stories/${storyId}/like`)
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
        jwtAxios
            .delete(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    alert("동화가 성공적으로 삭제되었습니다.")
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Container className="story-detail-container">
            <div className="story-header">
                <div className="story-nav-controls">
                    <Button as={Link} to={"/"} className="list-button">
                        <ArrowLeft size={16} className="me-2" />
                        목록보기
                    </Button>
                    {isLogin && memberId === storyDetail.memberId ? (
                        <div className="story-edit-controls">
                            <Button as={Link} to={`/stories/${storyId}/edit`} className="edit-button">
                                수정
                            </Button>
                            <Button onClick={deleteStory} className="delete-button">
                                삭제
                            </Button>
                        </div>
                    ) : null}
                </div>

                <div className="story-stats">
                    <div className="view-count">
                        <Eye size={18} className="me-2" />
                        {storyDetail.viewCount || 0}
                    </div>
                    <Button onClick={likeStory} className="like-button">
                        {isLiked ? <HeartFill size={18} className="heart-filled" /> : <Heart size={18} />}
                        {/*<span className="ms-2">{storyDetail.likeCount || 0}</span>*/}
                    </Button>
                </div>
            </div>

            <div className="story-content-wrapper">
                <Card className="story-content-card">
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

                <div className="story-pagination">
                    <div className="page-indicator">{pageNumber}/10</div>
                    <div className="pagination-controls">
                        {pageNumber > 0 && (
                            <Button onClick={goBackToPage} className="page-button prev-button">
                                <ArrowLeft size={20} />
                                <span className="ms-2">이전</span>
                            </Button>
                        )}
                        {pageNumber < 10 && (
                            <Button onClick={goToNextPage} className="page-button next-button">
                                <span className="me-2">다음</span>
                                <ArrowRight size={20} />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default StoryDetail

