import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import jwtAxios from "../../common/JwtAxios.js";
import useLoginStore from "../../store/useLoginStore.js";
import {api} from "../../common/CustomAxios.js";
import {Container, Spinner} from "react-bootstrap";

const LoginLoading = () => {
    const navigate = useNavigate();
    const {setLogin} = useLoginStore();

    const fetchMemberInfo = () => {
        jwtAxios.get("/members/me")
            .then(res => {
                if (res.status === 200) {
                    const responseData = res.data.data;
                    setLogin(responseData.memberId, responseData.memberName);
                } else {
                    alert("회원 정보 조회 중 오류 발생");
                    console.log("error: ", res);
                }
            })
            .catch(err => {
                alert("회원 정보 조회 중 오류 발생");
                console.log(err);
            })
    }


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        api.get(`/login/oauth2/code/kakao?code=${code}`, {withCredentials: true})
            .then(res => {
                if (res.status === 200) {
                    const responseBody = res.data;

                    if (responseBody.message === 'signup required') { // 회원가입 안된 유저는 회원가입 페이지로 리다이렉트
                        const oauthProviderMemberId = responseBody.data;
                        alert('최초가입이 필요합니다.');
                        navigate('/signup', {state: {oauthProvider: oauthProviderMemberId}});
                    } else { // 회원가입 된 유저는 로그인 처리
                        const accessToken = responseBody.data;
                        localStorage.setItem('access-token', accessToken);
                        fetchMemberInfo();
                        navigate('/home');
                    }
                } else {
                    alert("로그인 중 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.")
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err);
                alert("로그인 중 오류가 발생했습니다. 잠시 후에 다시 시도해주세요.")
                navigate('/login');
            });
    }, []);

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh' }}
        >
            <div className="d-flex align-items-center gap-3">
                <Spinner />
                <h1>로그인 중입니다.</h1>
            </div>
        </Container>

    )
}


export {LoginLoading}