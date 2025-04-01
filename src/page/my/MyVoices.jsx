import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import VoiceListComponent from "../../components/VoiceListComponent.jsx";

const MyVoices = () => {
    const navigate = useNavigate();

    const goToVoiceCloning = () => {
        // 내 최근 동화를 조회하고 없으면 동화 먼저 생성하도록, 있으면 그 동화 내용으로 보이스 클로닝
        navigate("/my/voices/new")
    }

    return (
        <Container>
            <Row>
                <Col>
                    <Card style={{height: "100%"}}>

                        <div style={{textAlign: "left", marginBottom: "10px"}}>
                            <Button onClick={goToVoiceCloning}>
                                + 목소리 등록
                            </Button>
                        </div>
                        <div>
                            <div style={{textAlign: "left"}}>
                                <span>사용자 목소리</span>
                            </div>
                            <VoiceListComponent />
                        </div>
                    </Card>
                </Col>
            </Row>


        </Container>
    );

}

export default MyVoices;

// "use client"
//
// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button, Card, Container, Row, Col } from "react-bootstrap"
// import { PlusLg, Mic,  } from "react-bootstrap-icons"
// import VoiceListComponent from "../../components/my/voice/VoiceListComponent.jsx";
//
// const MyVoices = () => {
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//
//     const goToVoiceCloning = () => {
//         setIsLoading(true)
//         // 내 최근 동화를 조회하고 없으면 동화 먼저 생성하도록, 있으면 그 동화 내용으로 보이스 클로닝
//         navigate("/dubbing/new")
//     }
//
//     return (
//         <Container className="py-4">
//             <Row className="mb-4">
//                 <Col>
//                     <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                             <h1 className="fw-bold">내 목소리</h1>
//                             <p className="text-muted">등록된 목소리를 관리하고 새로운 목소리를 추가하세요</p>
//                         </div>
//                         <Button
//                             variant="primary"
//                             onClick={goToVoiceCloning}
//                             disabled={isLoading}
//                             className="d-flex align-items-center gap-2"
//                         >
//                             {isLoading ? (
//                                 <>
//                                     <WaveSurround className="me-1" />
//                                     처리 중...
//                                 </>
//                             ) : (
//                                 <>
//                                     <PlusLg className="me-1" />
//                                     목소리 등록
//                                 </>
//                             )}
//                         </Button>
//                     </div>
//                 </Col>
//             </Row>
//
//             <Row>
//                 <Col>
//                     <Card className="shadow-sm">
//                         <Card.Header className="bg-white">
//                             <div className="d-flex align-items-center">
//                                 <Mic className="text-primary me-2" />
//                                 <div>
//                                     <Card.Title className="mb-0">사용자 목소리</Card.Title>
//                                     <Card.Subtitle className="text-muted mt-1 fs-6">
//                                         등록된 목소리를 선택하여 동화에 적용할 수 있습니다
//                                     </Card.Subtitle>
//                                 </div>
//                             </div>
//                         </Card.Header>
//                         <Card.Body>
//                             <VoiceListComponent />
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     )
// }
//
// export default MyVoices

