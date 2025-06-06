"use client"

import 'react'
import {Link} from 'react-router-dom'
import {Button, Card, Col, Container, Nav, NavItem, Row} from 'react-bootstrap'
import Footer from '../layout/Footer.jsx'
import StoryListContainer from "../container/StoryListContainer.jsx"
import "/src/css/index.css"

function Index() {
    return (
        <>
            <Container className="main-container" style={{display: "grid"}}>
                <Row className={"d-flex mb-3"}>
                    <Nav className="w-auto nav-pills">
                        <NavItem>
                            <Link to={"/"} className="nav-link active" aria-current="page">홈</Link>
                        </NavItem>
                        {/*<NavItem>*/}
                        {/*    <Link to={"/tale"} className="nav-link">동화</Link>*/}
                        {/*</NavItem>*/}
                    </Nav>
                    <Col className={"d-flex justify-content-end"}>
                        <Button as={Link} to={"/story/new"} className="create-story-button">
                            동화 만들기
                        </Button>
                    </Col>
                </Row>
                <Row className="hero-section">
                    <Card className="create-story-card">
                        <div className="create-story-content">
                            <h3 className="create-story-title">나만의 이야기를 직접 동화로 만들어 보세요!</h3>
                            <p className="create-story-subtitle">AI가 당신의 상상력을 아름다운 동화로 변환해 드립니다</p>
                        </div>
                        <div className="create-story-decoration"></div>
                    </Card>
                </Row>

                <Row className="stories-section">
                    {/*<h4 className="section-title">인기 동화</h4>*/}
                    <div className={"d-flex justify-content-end"}>
                        <Button>인기순</Button>
                        <Button>업로드순</Button>
                        <Button>조회순</Button>
                        <Button>좋아요순</Button>
                    </div>
                    <StoryListContainer/>
                </Row>
            </Container>
            <Footer/>
        </>
    )
}

export default Index

