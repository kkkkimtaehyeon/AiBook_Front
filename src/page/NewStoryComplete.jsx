import {useNavigate, useParams} from "react-router-dom";
import {useRef, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {Button, Card, CardBody, Container, FormCheck, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import AudioRecorder from "../components/AudioRecorder.jsx";

const RegisteredVoices = () => {
    const voiceList = [
        {
            "name": "잼민이",
            "sampleUrl": "https://sample-audio-url1"
        },
        {
            "name": "멋진 남성",
            "sampleUrl": "https://sample-audio-url2"
        }
    ]
    return (
        <Card>
            <CardBody>
                준비 중인 서비스입니다!
            </CardBody>
        </Card>
    )
}

const NewStoryComplete = () => {
    const navigate = useNavigate();
    const titleInputRef = useRef(null);
    const [isPublic, setIsPublic] = useState(false);
    const {storyId} = useParams();
    const [dubbingOption, setDubbingOption] = useState("none");

    const completeMakingStory = () => {
        const data = {
            title: titleInputRef.current.value,
            isPublic: isPublic
        }
        jwtAxios.patch(`http://localhost:8080/api/stories/${storyId}/complete`, data)
            .then((response) => {
                alert("동화가 성공적으로 만들어졌습니다.");
                if (response.data.code === 'CREATED') {
                    navigate(`/stories/${storyId}`);
                }

            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <Container>
            <h1>마지막으로 동화책의 제목을 지어주세요!</h1>
            <FormGroup>
                <FormLabel>제목</FormLabel>
                <FormControl
                    type={"text"}
                    ref={titleInputRef}
                />
            </FormGroup>
            <FormGroup>
                <FormLabel className="me-2">공개</FormLabel>
                <FormCheck
                    type="switch"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                />
            </FormGroup>
            {/*<FormGroup>*/}
            {/*    <FormLabel>더빙 옵션</FormLabel>*/}
            {/*    <div className="d-flex justify-content-center">*/}
            {/*        <FormCheck*/}
            {/*            type="radio"*/}
            {/*            name="dubbing"*/}
            {/*            label="더빙 안함"*/}
            {/*            value={"none"}*/}
            {/*            checked={dubbingOption === "none"}*/}
            {/*            onChange={(e) => setDubbingOption(e.target.value)}*/}
            {/*            className="d-flex align-items-center"*/}
            {/*        />*/}
            {/*        <FormCheck*/}
            {/*            type="radio"*/}
            {/*            name="dubbing"*/}
            {/*            label="직접 더빙"*/}
            {/*            value={"manual"}*/}
            {/*            onChange={(e) => setDubbingOption(e.target.value)}*/}
            {/*            className="d-flex align-items-center"*/}
            {/*        />*/}
            {/*        <FormCheck*/}
            {/*            type="radio"*/}
            {/*            name="dubbing"*/}
            {/*            label="등록한 목소리로 더빙"*/}
            {/*            value={"registered"}*/}
            {/*            onChange={(e) => setDubbingOption(e.target.value)}*/}
            {/*            className="d-flex align-items-center"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</FormGroup>*/}

            {/*{dubbingOption === "registered" ? <RegisteredVoices /> : null}*/}

            <Button onClick={() => completeMakingStory()}>저장</Button>
        </Container>
    )
}

export default NewStoryComplete;