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
        <button onClick={goToKakaLoginPage}>카카오로 로그인</button>
    );
}

export default Login;