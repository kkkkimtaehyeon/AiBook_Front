import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwtAxios from "../../common/JwtAxios.js";
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
                <Col>
                    <Card style={{ height: "100%"}}>

                        <div style={{textAlign: "left", marginBottom: "10px"}}>
                            <Button onClick={goToVoiceCloning}>
                                + 더빙
                            </Button>
                        </div>
                        <div>

                        </div>
                    </Card>
                </Col>
            </Row>


        </Container>
    );

}

export default MyVoices;
