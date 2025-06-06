import {Col, Container, Row} from "react-bootstrap";
import {ChevronRight} from "lucide-react";
import PageHeader from "../../newComponents/PageHeader.jsx";
import {useEffect, useState} from "react";
import jwtAxios from "../../common/JwtAxios.js";

const MyAccountPage = () => {

    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchMemberInfo();
    }, []);

    const fetchMemberInfo = () => {
        jwtAxios.get("/api/members/me")
            .then(res => {
                console.log(res.data.data);
                if (res.status === 200) {
                    setMember(res.data.data);
                } else {
                    console.error("Failed to fetch member info");
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    if (isLoading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    return (
        <Container className="py-4">
            {/* 헤더 */}
            <PageHeader title={"내 계정"}/>

            {/*프로필*/}
            <Row className="mb-5">
                <Col className={"d-flex align-items-center col-4"}>
                    <img
                        src="/src/assets/image_loading.jpg"
                        alt="profile_pic"
                        className="rounded-circle"
                        style={{height: "100px", width: "100px", objectFit: "cover"}}
                    />
                </Col>
                <Col className={"d-flex align-items-center px-0"}>
                    <Row className={"text-start "}>
                        <h3 className="fw-bold mb-1">{member.name}</h3>
                        {/*<span>aibook@gmail.com</span>*/}
                    </Row>
                </Col>
            </Row>

            <Row>
                <div
                    className="d-flex justify-content-between p-3 bg-light border-bottom"
                    style={{cursor: 'pointer'}}
                >
                    <span className="fw-medium">프로필 설정</span>
                    <ChevronRight size={20} className="text-muted"/>
                </div>
            </Row>

        </Container>
    );
}
export default MyAccountPage;