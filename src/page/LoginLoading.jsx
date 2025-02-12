import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react'
import jwtAxios from "../common/JwtAxios.js";
import useLoginStore from "../store/useLoginStore.js";

const LoginLoading = () => {
    const navigate = useNavigate();
    const {setLogin} = useLoginStore();

    const processLogin = async (token) => {
        localStorage.setItem('access-token', token);

        const response = await jwtAxios.get("http://localhost:8080/api/me");
        const responseData = response.data;
        try {
            if (responseData.success) {
                setLogin(responseData.data.memberId, responseData.data.memberName);
            } else {
                console.log(responseData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const url = 'http://localhost:8080/login/oauth2/code/kakao';

        axios.get(`${url}?code=${code}`)
            .then(res => {
                const responseData = res.data;
                if (responseData.success) {
                    if (responseData.code === 'FORBIDDEN') {
                        alert('최초가입이 필요합니다.');
                        console.log(responseData);
                        navigate('/signup', {state: {oauthProvider: responseData.data}});
                    } else if (responseData.code === 'OK') {
                        console.log(responseData);
                        const token = responseData.data;
                        processLogin(token);
                        navigate('/');
                    }
                } else {
                    console.log(res);
                    alert("로그인 중 오류가 발생했습니다.")
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <h1>로그인 중입니다.</h1>
        </>
    )
}


export {LoginLoading}