import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwtAxios from "../common/JwtAxios.js";

const useMyVoiceList = () => {
    const [myVoices, setMyVoices] = useState([]);
    const [defaultVoices, setDefaultVoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyVoices();
    }, []);

    function fetchMyVoices() {
        jwtAxios.get("/api/voices")
            .then((response) => {
                if (response.status === 200) {
                    const voices = response.data.data;
                    setMyVoices(voices.myVoices);
                    // setDefaultVoices(voices.defaultVoices);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function goToRegisterVoice() {
        navigate("/my/voices/register");
    }

    return {
        myVoices,
        defaultVoices,
        goToVoiceCloning: goToRegisterVoice
    }
}

export default useMyVoiceList;