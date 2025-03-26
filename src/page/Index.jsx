import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Container, Row} from 'react-bootstrap';
import Footer from '../layout/Footer.jsx';
import StoryListContainer from "../container/StoryListContainer.jsx";

function Index() {

    return (
        <>
            <Container>
                {/* 동화 만들기 섹션 */}
                <Row>
                    <Card>
                        <div>
                            <h3>나만의 이야기를 직접 동화로 만들어 보세요!</h3>
                            <Button as={Link} to={"/story/new"}>동화 만들기</Button>
                        </div>
                    </Card>
                </Row>

                <StoryListContainer/>
            </Container>
            <Footer/>
        </>
    );
}

export default Index;