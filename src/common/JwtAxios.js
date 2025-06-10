import axios from "axios";
import useLoginStore from "../store/useLoginStore.js";
import CONSTANTS from "../constants/Constants.js";
import {api} from "./CustomAxios.js";


const jwtAxios = axios.create({
    baseURL: CONSTANTS.API_SERVER_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
const getAccessToken = () => localStorage.getItem('access-token');
const setTokens = (accessToken) => {
    localStorage.setItem('access-token', accessToken);
};

// 토큰이 있으면 요청에 담아서 보내는 인터셉터
jwtAxios.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

jwtAxios.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalRequest = err.config;

        // err.response가 존재하는지 확인
        if (!err.response) {
            return Promise.reject(err);
        }


        const status = err.response.status;
        const message = err.response.data?.message;

        console.log("status: ", status);
        console.log("message: ", message);

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (message === 'token expired') {
                try {
                    const res = await api.post(
                        "/token/reissue",
                        {},
                        {withCredentials: true}
                    );

                    if (res.status === 200) {
                        console.log("토큰 재발급 성공", res);
                        const accessToken = res.data.data;
                        setTokens(accessToken);
                        return jwtAxios(originalRequest); // 재시도 결과 반환
                    }
                } catch (error) {
                    alert("토큰 재발급에 실패했습니다. 다시 로그인해주세요.");
                    const setLogout = useLoginStore.getState().setLogout;
                    setLogout();
                    window.location.href = "/login";
                    return Promise.reject(error);
                }
            } else if (message === 're-login required') {
                const setLogout = useLoginStore.getState().setLogout;
                setLogout();
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.href = "/login";
                // 리다이렉트 후에는 에러를 reject
                return Promise.reject(err);
            }
        }

        // 다른 모든 경우에는 원래 에러 반환
        return Promise.reject(err);
    }
);
export default jwtAxios;