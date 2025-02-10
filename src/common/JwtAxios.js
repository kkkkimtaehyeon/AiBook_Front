import axios from "axios";

const jwtAxios = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-Type": "application/json"
    }
});

// 토큰이 있으면 요청에 담아서 보내는 인터셉터
jwtAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default jwtAxios;