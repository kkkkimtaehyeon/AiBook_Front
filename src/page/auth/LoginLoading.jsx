import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import jwtAxios from "../../common/JwtAxios.js";
import useLoginStore from "../../store/useLoginStore.js";

const LoginLoading = () => {
    const navigate = useNavigate();
    const {setLogin} = useLoginStore();

    const fetchMemberInfo = () => {
        jwtAxios.get("http://localhost:8080/api/members/me")
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
        const url = 'http://localhost:8080/login/oauth2/code/kakao';

        axios.get(`${url}?code=${code}`, {withCredentials: true})
            .then(res => {
                if (res.status === 200) {
                    const responseBody = res.data;

                    if (responseBody.message === 'signup required') { // 회원가입 안된 유저는 회원가입 페이지로 리다이렉트
                        const oauthProviderMemberId = responseBody.data;
                        alert('최초가입이 필요합니다.');
                        navigate('/signup', {state: {oauthProvider: oauthProviderMemberId}});
                    }
                    else { // 회원가입 된 유저는 로그인 처리
                        const accessToken = responseBody.data;
                        localStorage.setItem('access-token', accessToken);
                        fetchMemberInfo();
                        navigate('/home');
                    }
                } else {
                    console.log(res);
                    alert("로그인 중 오류가 발생했습니다.")
                    navigate('/login');
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, []);

    return (
        <>
            <h1>로그인 중입니다.</h1>
        </>
    )
}


export {LoginLoading}