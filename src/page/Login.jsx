import {Card, CardBody, Image} from "react-bootstrap";

const Login = () => {

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
        <>
            <Card>
                <Image
                    src={"/src/assets/aibook_logo.png"}
                    style={{ width: "100px", height: "auto", margin: "0 auto", display: "block" }}>
                </Image>
                <h2>아이북에 로그인하기</h2>
                <CardBody>
                    <Image
                        onClick={goToKakaLoginPage}
                        src={"/src/assets/kakao_login_medium_wide.png"}
                        alt="카카오 로그인"
                        style={{cursor: "pointer"}}
                    />
                </CardBody>
            </Card>
        </>
    );
}

export default Login;