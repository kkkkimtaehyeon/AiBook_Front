import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import SideBarItem from "./SideBarItem.jsx";
import "../css/sidebar/sidebar.css";

const SideBar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const menus = [
        { name: "내 정보", path: "/my/info" },
        { name: "동화 목록", path: "/my/story/list" },
        { name: "목소리 목록", path: "/my/voices" },
        { name: "더빙한 동화 목록", path: "/my/dubbed-story" },
    ];

    // 현재 활성화된 메뉴 찾기
    const activeMenu = menus.find(menu => location.pathname === menu.path) || menus[0];

    return (
        <>
            {/* 모바일 드롭다운 메뉴 */}
            <div className="d-md-none dropdown-menu-container">
                <Dropdown show={isOpen} onToggle={(isOpen) => setIsOpen(isOpen)}>
                    <Dropdown.Toggle variant="light" id="sidebar-dropdown" className="sidebar-dropdown-toggle w-100">
                        {activeMenu.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="w-100">
                        {menus.map((menu, index) => (
                            <Dropdown.Item
                                key={index}
                                as={Link}
                                to={menu.path}
                                active={location.pathname === menu.path}
                            >
                                {menu.name}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* 데스크톱 세로 메뉴 */}
            <div className="d-none d-md-block sidebar-menu">
                {menus.map((menu, index) => (
                    <Link
                        to={menu.path}
                        key={index}
                        className={`sidebar-link ${location.pathname === menu.path ? "active" : ""}`}
                    >
                        <SideBarItem menu={menu} />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SideBar;