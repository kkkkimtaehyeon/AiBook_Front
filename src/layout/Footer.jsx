import "bootstrap/dist/css/bootstrap.min.css";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-primary text-light pt-5 pb-4">
            <div className="container">
                {/* 링크 섹션 */}
                <div className="row">
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Company</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Press</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Support</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Help Center</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Contact Us</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Shipping Info</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Legal</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
                            <li><a href="#" className="text-light text-decoration-none">Return Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="text-uppercase">Follow Us</h5>
                        {/*<div>*/}
                        {/*    <a href="#" className="text-light me-3"><FaFacebook size={20} /></a>*/}
                        {/*    <a href="#" className="text-light me-3"><FaTwitter size={20} /></a>*/}
                        {/*    <a href="#" className="text-light me-3"><FaInstagram size={20} /></a>*/}
                        {/*    <a href="#" className="text-light"><FaYoutube size={20} /></a>*/}
                        {/*</div>*/}
                    </div>
                </div>

                {/* 하단 저작권 정보 */}
                <hr className="bg-light" />
                <div className="text-center small">
                    <p className="mb-1">© 2025 AiBook. All rights reserved.</p>
                    <p>Designed by <span className="fw-bold text-white">kkkkimataehyeon</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
