// import {useRef, useState} from "react";
// import {v4 as uuidV4} from "uuid";
// import {useNavigate} from "react-router-dom";
// import {Button, Col, Container, Form, FormLabel, Row} from "react-bootstrap";
// import useStoryStore from "../store/useStoryStore.js";
//
// const NewBaseStory = () => {
//     const navigate = useNavigate();
//     const baseStoryInputRef = useRef(null);
//     const [isHelperOn, setIsHelperOn] = useState(false);
//     const {setStoryId, setBaseStory} = useStoryStore();
//
//
//     const createStory = () => {
//         const baseStory = baseStoryInputRef.current.value;
//         if (baseStory !== "") {
//             const tempStoryId = uuidV4()
//             setStoryId(tempStoryId);
//             setBaseStory(baseStory)
//             console.log("Base Story set:", baseStory); // 상태가 제대로 전달되는지 확인
//             navigate(`/stories/${tempStoryId}/new`);
//         } else {
//             alert("나의 이야기를 작성해주세요.");
//         }
//     }
//
//     return (
//         <Container className="my-5">
//             <Row className="justify-content-center">
//                 <Col md={8} lg={6}>
//                     <h3 className="text-center mb-4">시작 전, 나의 이야기를 작성해주세요!</h3>
//                     <Form className="align-items-center">
//                         <FormLabel className="me-2">입력 도우미</FormLabel>
//                         <Form.Check
//                             type="switch"
//                             id="custom-switch"
//                             checked={isHelperOn}
//                             onChange={() => setIsHelperOn(!isHelperOn)}
//                         />
//                     </Form>
//                     <div className="mb-3">
//                         {isHelperOn ? (
//                             <span className="text-muted">입력 도우미가 준비 중입니다.</span>
//                         ) : (
//                             <textarea
//                                 ref={baseStoryInputRef}
//                                 placeholder="ex) 오늘은 엄마, 아빠와 함께 동물원에 갔어요. 날씨가 좋아서..."
//                                 rows={8}
//                                 className="form-control"
//                                 style={{
//                                     resize: "none",
//                                     fontSize: "1.1rem",
//                                     padding: "15px",
//                                     borderRadius: "8px",
//                                     boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//                                 }}
//                             />
//                         )}
//                     </div>
//
//                     <div className="text-center">
//                         <Button onClick={createStory} variant="primary" size="lg" className="px-4 py-2 rounded-3">
//                             동화 만들기
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };
//
// export default NewBaseStory;

"use client"

import { useRef, useState } from "react"
import { v4 as uuidV4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap"
import useStoryStore from "../store/useStoryStore.js"
import "/src/css/page/newBaseStory.css" // Import custom styles

const NewBaseStory = () => {
    const navigate = useNavigate()
    const baseStoryInputRef = useRef(null)
    const [isHelperOn, setIsHelperOn] = useState(false)
    const { setStoryId, setBaseStory } = useStoryStore()

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
        <Container className="my-5 story-form-container">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <div className="story-form-card">
                        <h3 className="story-form-title">시작 전, 나의 이야기를 작성해주세요!</h3>
                        <p className="story-form-subtitle">아이와 함께한 특별한 순간이나 상상 속 이야기를 적어보세요</p>

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
                                    placeholder="ex) 오늘은 엄마, 아빠와 함께 동물원에 갔어요. 날씨가 좋아서..."
                                    rows={8}
                                    className="story-textarea"
                                />
                            )}
                        </div>

                        <div className="story-button-container">
                            <Button onClick={createStory} variant="primary" className="create-story-button">
                                동화 만들기
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default NewBaseStory

