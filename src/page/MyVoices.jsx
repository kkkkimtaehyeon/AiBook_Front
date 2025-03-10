import {Button, Card, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";

const MyVoices = () => {
    const navigate = useNavigate();
    const [voices, setVoices] = useState([]);

    useEffect(() => {
        const url = "http://localhost:8080/api/voices";
        jwtAxios.get(url)
            .then((response) => {
                if (response.data.success) {
                    setVoices(response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const goToVoiceCloning = () => {
        navigate("/my/voices/new")
    }

    return (
        <Container>
            <Card style={{width: 500, height: "100%"}}>

                <div style={{textAlign: "left", marginBottom: "10px"}}>
                    <Button onClick={goToVoiceCloning}>
                        목소리 등록하기
                    </Button>
                </div>
                <div>
                    <div style={{textAlign: "left"}}>
                        <span>사용자 목소리</span>
                    </div>
                    {voices.map((voice, index) => (
                        <Card key={index} style={{marginBottom: "10px"}}>
                            {voice.name}
                        </Card>
                    ))}
                </div>

            </Card>
        </Container>
    );

}

export default MyVoices;
