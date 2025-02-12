import {Link, useNavigate} from "react-router-dom";
import useLoginStore from "../store/useLoginStore.js";
import {useEffect} from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import jwtAxios from "../common/JwtAxios.js";

const Header = () => {
    const {isLogin, memberId, memberName, setLogout} = useLoginStore();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("isLogin: ", isLogin);
        console.log("memberId: ", memberId);
        console.log("memberName: ", memberName);
    }, []);

    const logout = async () => {
        const response = await jwtAxios.get("http://localhost:8080/api/logout");
        try {
            if (response.data.success) {
                localStorage.removeItem("access-token");
                setLogout();
                // window.location.reload();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Navbar bg="primary" variant="dark" expand="md" className="px-3 shadow">
            {/* 왼쪽 로고 */}
            <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
                아이북
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {isLogin ? (
                        <>
                            <NavDropdown title={memberName} id="nav-dropdown" align="end">
                                <NavDropdown.Item as={Link} to="/myPage">
                                    마이페이지
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={logout}>
                                    로그아웃
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <Nav.Link as={Link} to="/login" className="text-white">
                            로그인
                        </Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};


export default Header;
