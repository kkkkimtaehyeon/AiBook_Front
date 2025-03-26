import { Container, Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar.jsx";
import "../../css/myPage/myPage.css"; // CSS 파일

const MyPage = () => {
    return (
        <Container fluid className="my-page-container">
            <Row className="vh-100">
                {/* 사이드바 (왼쪽) */}
                <Col xs={12} md={3} className="sidebar-container">
                    <SideBar />
                </Col>

                {/* 메인 콘텐츠 (오른쪽) */}
                <Col xs={12} md={3} className="content-container">
                    <div className="content-wrapper">
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MyPage;
