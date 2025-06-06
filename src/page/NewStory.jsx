// import {useEffect, useState} from "react";
// import useStoryStore from "../store/useStoryStore.js";
// import {useNavigate} from "react-router-dom";
// import jwtAxios from "../common/JwtAxios.js";
// import {Button, Card, Col, Container, Row} from "react-bootstrap";
// import "/src/css/page/newStory.css"
//
// const NewStory = () => {
//     const [currentPage, setCurrentPage] = useState(0);
//     const navigate = useNavigate();
//     const {storyId, baseStory, clear, setStoryContext, selectedSentences, addSelectedSentence} = useStoryStore();
//     const [selectedContent, setSelectedContent] = useState("");
//     const [sentenceOptions, setSentenceOptions] = useState([]);
//     const [exSentence, setExSentence] = useState("");
//     const [loading, setLoading] = useState(false);
//
//     useEffect(() => {
//         clear();
//     }, []);
//
//     useEffect(() => {
//         console.log("sentences: ", selectedSentences);
//         if (currentPage === 0) {
//             requestFirstContentOptions();
//         } else if (currentPage <= 9) {
//             requestStoryContentOptions()
//         } else { // 마지막
//             navigate(`/stories/${storyId}/new/complete`);
//         }
//
//     }, [currentPage]);
//
//     const requestFirstContentOptions = () => {
//         const data = {
//             "baseStory": baseStory
//         }
//         jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/init`, data)
//             .then(response => {
//                 if (response && response.status === 200) {
//                     setStoryContext(response.data.storyContext);
//                     setSentenceOptions(response.data.sentenceOptions);
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     const requestStoryContentOptions = () => {
//         setLoading(true);
//         const data = {
//             "selectedSentence": selectedContent
//         }
//         jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/pages/${currentPage}/generate`, data)
//             .then(response => {
//                 setLoading(false);
//                 setSentenceOptions(response.data.sentenceOptions);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//
//     const goToNextPage = () => {
//         addSelectedSentence(currentPage, selectedContent);
//         setExSentence(selectedContent);
//         setCurrentPage(currentPage + 1);
//     }
//
//     const selectContent = (content) => {
//         setSelectedContent(content);
//         console.log("selectedContent: " + content);
//     };
//
//
//     return (
//         <Container className="my-5">
//             <Row className="justify-content-center">
//                 <Col md={8} lg={6}>
//                     <span className="text-center mb-4">{currentPage} 페이지</span>
//                     {currentPage > 0 ?
//                         <div className="mb-4">
//                             <h3>이전 내용</h3>
//                             <p className="border p-3 rounded-3 bg-light">{exSentence}</p>
//                         </div>
//                         :
//                         null
//                     }
//
//                     {loading ? (
//                         <div className="text-center">
//                             <Button className={"bg-light-subtle text-black"} disabled>
//                                 <span className="spinner-grow spinner-grow-sm text-primary" role="status"
//                                       aria-hidden="true"></span>
//                                 이야기를 생성 중입니다...
//                             </Button>
//                         </div>
//                     ) : (
//                         <>
//                             <h3>다음 내용을 선택해주세요.</h3>
//                             <div className="content-container">
//                                 <div className="d-flex flex-column align-items-start">
//                                     {sentenceOptions.map((option, index) => (
//                                         <Card key={index}
//                                               className={`mb-3 ${selectedContent === option ? 'border-primary bg-light' : ''}`}
//                                               style={{cursor: 'pointer'}}
//                                               onClick={() => selectContent(option)}>
//                                             <Card.Body>
//                                                 <Card.Text>{option}</Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     ))}
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                     <div className="text-center">
//                         <Button onClick={goToNextPage} variant="primary" size="lg" className="px-4 py-2 rounded-3">
//                             다음 페이지
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default NewStory;

import {useEffect, useState} from "react";
import useStoryStore from "../store/useStoryStore.js";
import {useNavigate} from "react-router-dom";
import jwtAxios from "../common/JwtAxios.js";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import "/src/css/page/newStory.css"

const NewStory = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const {storyId, baseStory, clear, setStoryContext, selectedSentences, addSelectedSentence} = useStoryStore();
    const [selectedContent, setSelectedContent] = useState("");
    const [sentenceOptions, setSentenceOptions] = useState([]);
    const [exSentence, setExSentence] = useState("");
    const [loading, setLoading] = useState(false);

    const dummySentenceOptions = ["최근 2년 이내, 본인이 스스로 설정한 가장 도전적인 목표에 대해 작성해 주세요. 그 목표를 세운 계기와 수행 과정, 마주한 어려움과 극복 방법, 결과 및 느낀 점을 포함해 주세요. (목표 설정 동기 / 도전 수준 / 장애물 / 해결 방식 / 결과 및 성장)", "협업 또는 팀 프로젝트 과정에서 의견 충돌이나 역할 갈등을 경험한 사례를 작성해 주세요. 당시 상황과 본인의 역할, 갈등 해소를 위해 한 노력, 그 결과와 느낀 점을 포함해 주세요. (활동 목적 / 갈등 원인 / 본인의 역할 / 대응 방식 / 결과 / 배운 점)", "지원한 직무를 준비하면서 자발적으로 선택하고 실행한 활동 중, 본인의 역량 향상에 가장 도움이 되었다고 생각하는 경험을 작성해 주세요. 활동을 선택한 이유, 진행 방식, 배운 점과 직무와의 연관성을 포함해 주세요. (활동 선택 배경 / 실행 과정 / 몰입 경험 / 향상된 역량 / 직무와의 연결성)"];

    useEffect(() => {
        clear();
    }, []);

    useEffect(() => {
        console.log("sentences: ", selectedSentences);
        if (currentPage === 0) {
            requestFirstContentOptions();
        } else if (currentPage <= 9) {
            requestStoryContentOptions()
        } else { // 마지막
            navigate(`/stories/${storyId}/new/complete`);
        }

    }, [currentPage]);

    const requestFirstContentOptions = () => {
        const data = {
            "baseStory": baseStory
        }
        jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/init`, data)
            .then(response => {
                if (response && response.status === 200) {
                    setStoryContext(response.data.storyContext);
                    setSentenceOptions(response.data.sentenceOptions);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const requestStoryContentOptions = () => {
        setLoading(true);
        const data = {
            "selectedSentence": selectedContent
        }
        jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/pages/${currentPage}/generate`, data)
            .then(response => {
                setLoading(false);
                setSentenceOptions(response.data.sentenceOptions);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const goToNextPage = () => {
        addSelectedSentence(currentPage, selectedContent);
        setExSentence(selectedContent);
        setCurrentPage(currentPage + 1);
    }

    const selectContent = (content) => {
        setSelectedContent(content);
        console.log("selectedContent: " + content);
    };


    return (
        <Container className="story-container my-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <span className="story-page-indicator">{currentPage} 페이지</span>
                    {currentPage > 0 ?
                        <div className="story-previous-section mb-4">
                            <h3 className="story-section-heading">이전 내용</h3>
                            <p className="story-previous-content">{exSentence}</p>
                        </div>
                        :
                        null
                    }

                    {/*<h3 className="story-section-heading">다음 내용을 선택해주세요.</h3>*/}
                    {/*<div className="story-options-container">*/}
                    {/*    <div className="story-options-wrapper flex-column align-items-start">*/}
                    {/*        {dummySentenceOptions.map((option, index) => (*/}
                    {/*            <Card key={index}*/}
                    {/*                  className={`story-option-card ${selectedContent === option ? 'story-option-card-selected' : ''}`}*/}
                    {/*                  onClick={() => selectContent(option)}>*/}
                    {/*                <Card.Body className="story-option-card-body">*/}
                    {/*                    <Card.Text className="story-option-text">{option}</Card.Text>*/}
                    {/*                </Card.Body>*/}
                    {/*            </Card>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {loading ? (
                        <div className="story-loading-container text-center">
                            <Button className="story-loading-button" disabled>
                                <span className="spinner-grow spinner-grow-sm story-loading-spinner" role="status"
                                      aria-hidden="true"></span>
                                이야기를 생성 중입니다...
                            </Button>
                        </div>
                    ) : (
                        <>
                            <h3 className="story-section-heading">다음 내용을 선택해주세요.</h3>
                            <div className="story-options-container">
                                <div className="story-options-wrapper flex-column align-items-start">
                                    {sentenceOptions.map((option, index) => (
                                        <Card key={index}
                                              className={`story-option-card ${selectedContent === option ? 'story-option-card-selected' : ''}`}
                                              onClick={() => selectContent(option)}>
                                            <Card.Body className="story-option-card-body">
                                                <Card.Text className="story-option-text">{option}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="story-button-container text-center">
                        <Button onClick={goToNextPage} variant="primary" size="lg" className="story-navigation-button">
                            다음 페이지
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NewStory;