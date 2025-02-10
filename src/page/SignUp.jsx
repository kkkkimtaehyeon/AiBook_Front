import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const oauthProviderData = location.state?.oauthProvider || ""; // 안전한 접근

    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const signUp = async () => {
        const url = "http://localhost:8080/api/members";
        await axios.post(url, {
            oauthProvider: oauthProviderData.oauthProvider,
            oauthProviderMemberId: oauthProviderData.oauthProviderMemberId,
            email: email,
            nickName: nickName,
            birthDate: birthDate
        })
            .then((response) => {
                if (response.data.code === 'CREATED') {
                    console.log("회원가입 성공:", response.data);
                    alert("회원가입이 성공했습니다. 로그인 후 이용해주세요");
                    navigate("/login");
                }
            })
            .catch(error => {
                alert("회원가입 중 오류가 발생했습니다." + error);
                console.error("회원가입 실패:", error);
            });
    };

    return (
        <>
            <h1>aibook 회원가입</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aibook@naver.com"
            />
            <input
                type="text"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                placeholder="김아이"
            />
            <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
            />
            <button onClick={signUp}>회원가입</button>
        </>
    );
};

export {SignUp};
