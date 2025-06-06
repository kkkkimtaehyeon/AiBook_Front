import {Button, Card, Container, Row} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import {useEffect, useState} from "react";
import {ArrowRepeat} from "react-bootstrap-icons";
import useStoryStore from "../../store/useStoryStore.js";
import {useLocation, useNavigate} from "react-router-dom";
import jwtAxios from "../../common/JwtAxios.js";

const NewStoryCoverPage = () => {
    const MAX_REGENERATE_COUNT = 1; // 최대 재생성 횟수
    const [isLoading, setIsLoading] = useState(true);
    const [regenerateCount, setRegenerateCount] = useState(MAX_REGENERATE_COUNT);
    const {coverImageBase64, baseStory, selectedSentences} = useStoryStore();
    const navigate = useNavigate();

    const location = useLocation();
    // const title = location.state.title;
    // const isPublic = location.state.isPublic;
    // const tagIds = location.state.tagIds;

    const title = 'title';
    const isPublic = true;
    const tagIds = [1,2];

    const cover = "/src/assets/img.png"


    useEffect(() => {
        console.log({coverImageBase64});
        if (coverImageBase64 === "") {
            setIsLoading(true);
            return;
        }
        setIsLoading(false);
    }, [coverImageBase64]);

    const createStory = () => {
        const data = {
            title: title,
            isPublic: isPublic,
            tagIds: tagIds,
            baseStory: baseStory,
            selectedSentences: selectedSentences,
            coverImageBase64: coverImageBase64
        }
        jwtAxios.post("http://localhost:8080/api/stories", data)
            .then(res => {
                if (res.status === 201) {
                    const savedStoryId = res.data.data;
                    navigate(`/stories/${savedStoryId}`);
                }
            })
            .catch(err => {
                console.log("Error creating story:", err);
            });
    }

    const regenerateImage = () => {
        if (regenerateCount === 0) {
            alert("이미지를 더 이상 재생성할 수 없습니다.");
            return;
        }
        setRegenerateCount(regenerateCount - 1);
    }

    return (
        <Container className={"py-4"}>
            <PageHeader title={"새로운 동화"}/>
            <Row className={"m-2 mb-4"}>
                <Card
                    className="w-100 rounded-5 justify-content-center overflow-hidden p-0"
                    style={{ height: '450px' }}
                >
                    <img
                        src={cover}
                        alt="img"
                        className="h-100 w-100"
                        style={{
                            objectFit: 'cover',
                            borderRadius: 'inherit'
                        }}
                    />
                </Card>
            </Row>
            {/*<Row className={"m-2 mb-4"}>*/}

            {/*    <Card*/}
            {/*        className="w-100 rounded-5 justify-content-center overflow-hidden"*/}
            {/*        style={{height: '300px'}}*/}
            {/*    > {isLoading ? (*/}
            {/*        <div className={"justify-content-center"}>*/}
            {/*            <div className="spinner-border text-primary" role="status">*/}
            {/*            </div>*/}
            {/*        </div>*/}


            {/*    ) : (*/}
            {/*        <img*/}
            {/*            src={"data:image/jpeg;base64," + coverImageBase64}*/}
            {/*            alt="img"*/}
            {/*            className="d-block rounded-5 h-100 w-100 object-fit-cover"*/}
            {/*        />*/}
            {/*    )}*/}
            {/*    </Card>*/}
            {/*</Row>*/}

            <Row>
                <ArrowRepeat
                    className={"mb-2"}
                    style={{fontSize: "30px"}}
                    onClick={() => regenerateImage()}
                />
                <p>{regenerateCount} / {MAX_REGENERATE_COUNT} </p>
            </Row>

            <Row className="mt-4 p-2">
                <Button
                    // disabled={isLoading}
                    onClick={() => createStory()}
                >
                    완료
                </Button>
            </Row>

        </Container>
    )
}

export default NewStoryCoverPage;