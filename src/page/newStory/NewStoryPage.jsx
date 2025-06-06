import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import useStoryStore from "../../store/useStoryStore.js";
import {useNavigate} from "react-router-dom";
import PageHeader from "../../newComponents/PageHeader.jsx";
import {ai} from "../../common/CustomAxios.js";

const NewStoryPage = () => {

    const [selectedContent, setSelectedContent] = useState("");
    const [contentOptions, setContentOptions] = useState([]);
    const {
        storyId,
        clear, baseStory,
        currentPage, setCurrentPage,
        addSelectedSentence,
    } = useStoryStore();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [exSentence, setExSentence] = useState("");

    useEffect(() => {
        console.log(selectedContent);
    }, [selectedContent]);

    useEffect(() => {
        clear();
    }, []);

    useEffect(() => {
        if (currentPage <= 10) {
            requestStoryContentOptions()
        } else {
            // requestCoverImageGeneration();
            navigate(`/stories/${storyId}/new/setting`);
        }
    }, [currentPage]);

    // const requestCoverImageGeneration = () => {
    //     axios.post(`http://localhost:8000/v1/api/image-generation`, {contents: selectedSentences})
    //         .then(res => {
    //             if (res.status === 200) {
    //                 console.log("이미지가 성공적으로 생성 되었습니다.");
    //                 console.log("response data: ", res.data);
    //                 const responseJson = res.data.json();
    //                 console.log("ResponseJson data:", responseJson);
    //                 setCoverImageBase64(responseJson.image);
    //
    //             } else {
    //                 console.error("Failed to send cover image generation request.");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }

    // const requestFirstContentOptions = () => {
    //     jwtAxios.post(`http://localhost:8000/ai/stories/${storyId}/init`, {"baseStory": baseStory})
    //         .then(res => {
    //             if (res.status === 200) {
    //                 setStoryContext(res.data.storyContext);
    //                 setContentOptions(res.data.sentenceOptions);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         }).finally(() => {
    //         setIsLoading(false);
    //     })
    // };

    const requestStoryContentOptions = () => {
        setIsLoading(true);
        let data;
        if (currentPage === 1) {
            data = {"baseStory": baseStory}
        } else {
            data = {"selectedSentence": selectedContent}
        }
        ai.post(`/v2/ai/stories/${storyId}/pages/${currentPage}/generate`, JSON.stringify(data))
            .then(res => {
                setIsLoading(false);
                setContentOptions(res.data.sentenceOptions);
                setSelectedContent(""); // 다음 페이지를 위해 선택 초기화
            })
            .catch(err => {
                console.log(err);
            }).finally(() => {
            setIsLoading(false);
        })
    };

    const goToNextPage = () => {
        addSelectedSentence(currentPage, selectedContent);
        setExSentence(selectedContent);
        setCurrentPage(currentPage + 1);

    };

    return (
        <Container className={"py-4"} style={{marginBottom: "80px"}}>
            <PageHeader title={"새로운 동화"}/>

            <Row className={"mb-4 text-start"}>
                {currentPage > 1 && ( // 이전 페이지가 있을 때만 exSentence 표시
                    <>
                        <span className={"fw-bold mb-2"}>이전 이야기</span>
                        <p>{exSentence}</p>
                    </>
                )}
            </Row>

            {/*로딩이 완료된 후에 선택지를 보여줍니다.*/}
            <Row>
                <Col className={"m-3"}>
                    {contentOptions.map((contentOption, index) => (
                        <Row key={index}>
                            <Card
                                className={`d-flex justify-content-between rounded-4 p-3 mb-2 ${selectedContent === contentOption ? 'border border-primary' : ''}`}
                                style={{cursor: 'pointer'}}
                                onClick={() => setSelectedContent(contentOption)}
                            >
                                <div className="text-start">
                                    <p className="mb-0">{contentOption}</p>
                                </div>
                            </Card>
                        </Row>
                    ))}
                </Col>
            </Row>


            <Row className={"justify-content-center mb-4"}>
                {currentPage} / 10
            </Row>

            <Row className="mt-4 p-2">
                <Button
                    disabled={selectedContent === "" || isLoading}
                    onClick={() => goToNextPage()}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-grow spinner-grow-sm story-loading-spinner"
                                  role="status"
                                  aria-hidden="true"></span>
                            이야기를 생성 중입니다...
                        </>
                    ) : "다음"}
                </Button>
            </Row>
        </Container>
    );
};

export default NewStoryPage;
