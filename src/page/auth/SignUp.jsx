import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Card, Container, FormControl, FormLabel, InputGroup} from "react-bootstrap";
import {api} from "../../common/CustomAxios.js";

const SignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const oauthProviderData = location.state?.oauthProvider || ""; // 안전한 접근

    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const signUp = async () => {
        await api.post("/api/members", {
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
        <Container style={{display: "flex", justifyContent: "center", minHeight: "100vh"}}>
            <Card className="mt-5 h-50" style={{width: "400px", padding: "2rem"}}>
                <div className="mb-4">
                    <h2 style={{textAlign: "center"}}>aibook 회원가입</h2>
                </div>

                <InputGroup style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <div>
                        <FormLabel htmlFor="email">이메일</FormLabel>
                        <FormControl
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="aibook@naver.com"
                        />
                    </div>

                    <div>
                        <FormLabel htmlFor="nickname">닉네임</FormLabel>
                        <FormControl
                            id="nickname"
                            type="text"
                            value={nickName}
                            onChange={(e) => setNickName(e.target.value)}
                            placeholder="김아이"
                        />
                    </div>

                    <div>
                        <FormLabel htmlFor="birthDate">생년월일</FormLabel>
                        <FormControl
                            id="birthDate"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                </InputGroup>

                <Button onClick={signUp} style={{marginTop: "1.5rem", width: "100%"}}>
                    회원가입
                </Button>
            </Card>
        </Container>


    );
};

export {SignUp};
