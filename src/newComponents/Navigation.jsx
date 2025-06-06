import { Link } from "react-router-dom";

const Navigation = ({ items }) => {
    return (
        <>
            <ul className="nav">
                {items.map((item, index) => (
                    <li key={index} className="nav-item">
                        <Link
                            to={item.path}
                            style={{ color: "black" }}
                            className="nav-link"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <hr />
        </>
    );
};

export default Navigation;