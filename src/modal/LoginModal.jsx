import { Modal, Image } from "react-bootstrap";

const LoginModal = ({ isOpen, toggle }) => {

    const goToKakaLoginPage = () => {
        const kakaoClientId = '56fa105d4e79219dc0a0f22fca878e39';
        const kakaoOauthRedirectUri = 'http://localhost:5173/login/oauth2/code/kakao';
        const kakaoOauthLoginUrl = 'https://kauth.kakao.com/oauth/authorize';
        const params = new URLSearchParams();
        params.append('client_id', kakaoClientId);
        params.append('redirect_uri', kakaoOauthRedirectUri);
        params.append('response_type', 'code');

        window.location.href = `${kakaoOauthLoginUrl}?${params.toString()}`;
    }

    return (
        <Modal show={isOpen} onHide={toggle} centered>
            <Modal.Header closeButton>
                <h1>아이북</h1>
            </Modal.Header>

            {/*카카오 로그인*/}
            <Modal.Body className="text-center">
                <Image
                    onClick={goToKakaLoginPage}
                    src={"/assets/kakao_login_medium_wide.png"}
                    alt="카카오 로그인"
                    style={{ cursor: "pointer" }}
                />
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
