import {Card, CardBody, Container, Image} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import {useEffect} from "react";

const Login = () => {
    const kakaoClientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const kakaoOauthRedirectUri = import.meta.env.VITE_KAKAO_OAUTH_REDIRECT_URI;
    const kakaoOauthLoginUrl = import.meta.env.VITE_KAKAO_OAUTH_LOGIN_URL;
    const params = new URLSearchParams();

    useEffect(() => {
        console.log("카카오 클라이언트 ID:", kakaoClientId);
    }, []);

    const goToKakaLoginPage = () => {

        params.append('client_id', kakaoClientId);
        params.append('redirect_uri', kakaoOauthRedirectUri);
        params.append('response_type', 'code');

        window.location.href = `${kakaoOauthLoginUrl}?${params.toString()}`;
    }

    return (
        <Container className={"py-4"}>
            <PageHeader title={"로그인"} />
            <Card>
                <Image
                    src={"/assets/aibook_logo.png"}
                    style={{ width: "100px", height: "auto", margin: "0 auto", display: "block" }}>
                </Image>
                <h2>아이북에 로그인하기</h2>
                <CardBody>
                    <Image
                        onClick={goToKakaLoginPage}
                        src={"/assets/kakao_login_medium_wide.png"}
                        alt="카카오 로그인"
                        style={{cursor: "pointer"}}
                    />
                </CardBody>
            </Card>
        </Container>
    );
}

export default Login;