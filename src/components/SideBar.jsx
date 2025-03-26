import { Link, useLocation } from "react-router-dom";
import SideBarItem from "./SideBarItem.jsx";
import "../css/sidebar/sidebar.css";

const SideBar = () => {
    const location = useLocation();
    const menus = [
        { name: "내 정보", path: "/my/info" },
        { name: "동화 목록", path: "/my/story/list" },
        { name: "목소리 목록", path: "/my/voices" },
        { name: "더빙", path: "/my/dubbed-story" },
    ];

    return (
        <div className="sidebar">
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
    );
};

export default SideBar;
