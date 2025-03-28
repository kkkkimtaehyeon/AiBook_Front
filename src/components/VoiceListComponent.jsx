import {Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";

const VoiceListComponent = ({clickHandler}) => {

    const [voices, setVoices] = useState([]);

    useEffect(() => {
        getVoices();
    }, []);

    const getVoices = () => {
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
    }

    return (
        <>
            {voices.map((voice, index) => (
                <Card
                    key={index}
                    style={{marginBottom: "10px"}}
                    onClick={() => clickHandler(voice.id)}
                >
                    {voice.name}
                </Card>
            ))}
        </>
    );

}

export default VoiceListComponent;