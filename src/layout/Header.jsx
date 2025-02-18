import {Link} from "react-router-dom";
import useLoginStore from "../store/useLoginStore.js";
import {useEffect} from "react";
import {Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import jwtAxios from "../common/JwtAxios.js";
import 'bootstrap/dist/css/bootstrap.css';
import '../css/layout/header.css'



const Header = () => {
    const {isLogin, memberId, memberName, setLogout} = useLoginStore();

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
                window.location.assign("/");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar bg="light" variant="dark" expand="md" className="px-3 header">
                {/* 왼쪽 로고 */}
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    <Image
                        src={"/src/assets/aibook_logo.png"}
                        style={{ width: "50px", height: "auto", margin: "0 auto", display: "block" }}
                        alt={"아이북"}>
                    </Image>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" >
                        {isLogin ? (
                            <>
                                <NavDropdown title={<span style={{ color: "black" }}>{memberName}</span>} id="nav-dropdown" align="end">
                                <NavDropdown.Item as={Link} to="/my/info">
                                        마이페이지
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>
                                        로그아웃
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="text-black">
                                로그인/회원가입
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};


export default Header;
