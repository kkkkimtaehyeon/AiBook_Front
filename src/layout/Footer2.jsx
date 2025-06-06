import {Row} from "react-bootstrap";
import {HouseDoor, Person, PlusSquare} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

const Footer2 = () => {

    return (
        <Row
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: "white",
                borderTop: "1px solid #ccc",
                paddingTop: "10px",
                paddingBottom: "10px",
                textAlign: "center",
                zIndex: 1000,
            }}
        >
            <Link to={"/home"} style={{textDecoration: "none", color: "black"}} className={"col"}>
                <div style={{marginBottom: "10px"}}>
                    <HouseDoor style={{fontSize: "23px"}}/>
                </div>
                홈
            </Link>
            <Link to={"/story/new"} style={{textDecoration: "none", color: "black"}} className={"col"}>
                <div style={{marginBottom: "10px"}}>
                    <PlusSquare style={{fontSize: "23px"}}/>
                </div>
                새 동화
            </Link>
            <Link to={"/my"} style={{textDecoration: "none", color: "black"}} className={"col"}>
                <div style={{marginBottom: "10px"}}>
                    <Person style={{fontSize: "23px"}}/>
                </div>
                마이페이지
            </Link>
        </Row>

    )
}

export default Footer2;