import "bootstrap/dist/css/bootstrap.min.css";
import "../css/layout/footer.css"
import {EnvelopeFill, Github} from "react-bootstrap-icons";

const Footer = () => {
    return (
        <footer className="pt-5 pb-4">
            <div className="container">

                {/* 하단 저작권 정보 */}
                <hr className="bg-light"/>
                <div className="text-center small">
                    <EnvelopeFill/> 4kimtaehyeon@gmail.com
                    <br/>
                    <Github/> <a href={"https://github.com/kkkkimtaehyeon"}>github.com/kkkkimtaehyeon</a>
                </div>
                <br/>
                <div className="text-center small">
                    <p className="mb-1">© 2025 AiBook. All rights reserved.</p>
                    <p>Designed by <span className="fw-bold">kkkkimataehyeon</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
