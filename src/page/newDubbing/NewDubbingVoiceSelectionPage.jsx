import {Button, Container, Row} from "react-bootstrap";
import PageHeader from "../../newComponents/PageHeader.jsx";
import VoiceCardList from "../../newComponents/VoiceCardList.jsx";
import {useEffect, useState} from "react";
import jwtAxios from "../../common/JwtAxios.js";

const NewDubbingVoiceSelectionPage = () => {
    // const {myVoices, defaultVoices} = useMyVoiceList();
    const [myVoices, setMyVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const handleVoiceSelect = (voice) => {
        console.log(voice);
        setSelectedVoice(voice)
    }

    useEffect(() => {
        fetchMyVoices();
    }, []);

    function fetchMyVoices() {
        jwtAxios.get("/voices")
            .then((response) => {
                if (response.status === 200) {
                    const voices = response.data.data;
                    console.log(voices);
                    setMyVoices(voices.myVoices);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleRequestDubbing = () => {
        console.log('더빙이 요청됩니다.');
    }

    return (
        <Container>
            <PageHeader title={"더빙할 목소리 선택"}/>

            {/* 목소리 목록 */}
            <Row className="mb-4">
                <VoiceCardList
                    voices={myVoices}
                    onClick={handleVoiceSelect}
                />
            </Row>

            {/* 더빙 요청 버튼 */}
            <Button
                variant="primary"
                className="rounded-pill fw-bold"
                onClick={() => handleRequestDubbing()}
                disabled={!selectedVoice}
                style={{
                    position: "fixed",
                    bottom: 100,
                    left: 15,
                    right: 15,
                    textAlign: "center",
                    cursor: "pointer",
                    zIndex: 1000
                }}
            >
                {selectedVoice === null ? "목소리를 선택해주세요." : `[ ${selectedVoice.title} ]로 더빙하기`}
            </Button>
        </Container>
    );
}
export default NewDubbingVoiceSelectionPage;