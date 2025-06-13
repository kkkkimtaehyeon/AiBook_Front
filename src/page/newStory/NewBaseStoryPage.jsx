import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import useStoryStore from "../../store/useStoryStore.js";
import {v4 as uuidV4} from "uuid";
import {Button, Container, Form, FormLabel, Row} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import "/src/css/page/newBaseStory.css"
const NewBaseStoryPage = () => {
    const navigate = useNavigate()
    const baseStoryInputRef = useRef(null)
    const [isHelperOn, setIsHelperOn] = useState(false)
    const {setStoryId, setBaseStory} = useStoryStore()

    const createStory = () => {
        const baseStory = baseStoryInputRef.current.value
        if (baseStory !== "") {
            const tempStoryId = uuidV4()
            setStoryId(tempStoryId)
            setBaseStory(baseStory)
            console.log("Base Story set:", baseStory) // 상태가 제대로 전달되는지 확인
            navigate(`/stories/${tempStoryId}/new`)
        } else {
            alert("나의 이야기를 작성해주세요.")
        }
    }

    return (
        <Container className={"py-4"} style={{marginBottom: "100px"}}>
            <PageHeader title={"새로운 동화"}/>

            <Row className="justify-content-center">
                <div className={"py-5"}>
                    <Form className="helper-switch-container">
                        <div className="d-flex align-items-center justify-content-center">
                            <FormLabel className="helper-label">입력 도우미</FormLabel>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                checked={isHelperOn}
                                onChange={() => setIsHelperOn(!isHelperOn)}
                                className="custom-switch"
                            />
                        </div>
                        {isHelperOn && (
                            <p className="helper-text">입력 도우미가 준비 중입니다.</p>
                        )}
                    </Form>

                    <div className="story-textarea-container">
                        {!isHelperOn && (
                            <textarea
                                ref={baseStoryInputRef}
                                placeholder="시작 전, 나의 이야기를 작성해주세요!"
                                rows={8}
                                className="story-textarea"
                            />
                        )}
                    </div>

                    <Row className="mt-4 p-2">
                        <Button onClick={createStory}>동화 만들기</Button>
                    </Row>
                </div>
            </Row>
        </Container>
    )
}

export default NewBaseStoryPage;