import {Col, Container, Row} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import VoiceCardList from "../../newComponents/VoiceCardList.jsx";
import useMyVoiceList from "../../hooks/useMyVoiceList.js";
import {PlusLg} from "react-bootstrap-icons";

const MyVoiceListPage = () => {
    const {myVoices, goToVoiceCloning} = useMyVoiceList();

    return (
        <Container className="py-4">
            {/* 헤더 */}
            <PageHeader
                title={"목소리"}
                rightIcon={PlusLg}
                onRightClick={goToVoiceCloning}
            />

            <Row className="mb-4 bg-light border" style={{height: 50}}>
                <Col className="d-flex align-items-center justify-content-start">
                    <h5 className={"fw-bold m-0"}>기본 목소리</h5>
                </Col>
            </Row>

            {/* 기본 목소리 목록 */}
            {/*<Row className="mb-4">*/}
            {/*    <VoiceCardList voices={defaultVoices} />*/}
            {/*</Row>*/}

            <Row className="mb-4 bg-light border" style={{height: 50}}>
                <Col className="d-flex align-items-center justify-content-start">
                    <h5 className={"fw-bold m-0"}>내 목소리</h5>
                </Col>
            </Row>

            {/* 내 목소리 목록 */}
            <Row className="mb-4">
                <VoiceCardList voices={myVoices} />
            </Row>
        </Container>
    );
}

export default MyVoiceListPage;