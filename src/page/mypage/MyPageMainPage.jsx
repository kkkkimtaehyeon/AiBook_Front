import {Container, Row} from "react-bootstrap";
import {ChevronRight} from "lucide-react";
import {useNavigate} from "react-router-dom";
import PageHeader from "../../newComponents/PageHeader.jsx";
import useLoginStore from "../../store/useLoginStore.js";
import jwtAxios from "../../common/JwtAxios.js";

const MyPageMainPage = () => {
    const navigate = useNavigate();
    const {isLogin, setLogout} = useLoginStore();
    const menus = [
        {
            title: "계정",
            path: "account"
        },
        {
            title: "동화 목록",
            path: "stories"
        },
        {
            title: "목소리 목록",
            path: "voices"
        },
        {
            title: "더빙 목록",
            path: "dubbings"
        }
    ]

    function goTo(path) {
        navigate(path);
    }

    const logout = async () => {
        const response = await jwtAxios.get("http://localhost:8080/api/logout", {withCredentials: true});
        try {
            if (response.data.success) {
                localStorage.removeItem("access-token");
                setLogout();
                window.location.assign("/home");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container className="py-4">
            {/* 헤더 */}
            <PageHeader
                title={"마이페이지"}
            />
            {isLogin ? (
                <>
                    <Row>
                        {menus.map((menu, index) => (
                            <div
                                key={index}
                                className="d-flex justify-content-between p-3 bg-light border-bottom"
                                style={{cursor: 'pointer'}}
                                onClick={() => goTo(menu.path)}
                            >
                                <span className="fw-medium">{menu.title}</span>
                                <ChevronRight size={20} className="text-muted"/>
                            </div>
                        ))}
                    </Row>
                    <Row>
                        <div
                            className="d-flex justify-content-between p-3 bg-light border-bottom"
                            style={{cursor: 'pointer'}}
                            onClick={() => logout()}
                        >
                            <span className="fw-medium">로그아웃</span>
                            <ChevronRight size={20} className="text-muted"/>
                        </div>
                    </Row>
                </>
                
                
            ) : (
                <Row>
                    <div
                        className="d-flex justify-content-between p-3 bg-light border-bottom"
                        style={{cursor: 'pointer'}}
                        onClick={() => goTo("/login")}
                    >
                        <span className="fw-medium">로그인</span>
                        <ChevronRight size={20} className="text-muted"/>
                    </div>
                </Row>
            )}


        </Container>
    );
}

export default MyPageMainPage;