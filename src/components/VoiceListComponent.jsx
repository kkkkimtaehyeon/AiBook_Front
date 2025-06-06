import {Card, Form} from "react-bootstrap";

const VoiceListComponent = ({clickHandler, voices, isEditMode = false, selectedVoiceId, setSelectedVoiceId}) => {
    return (
        <>
            {voices.map((voice) => (
                <Card
                    key={voice.id}
                    onClick={() => clickHandler(voice.id)}
                    style={{
                        cursor: "pointer",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        width: "100%",        // 또는 "500px" 같은 고정값도 가능
                        maxWidth: "600px",    // 필요시 최대 너비 제한
                        margin: "0 auto"      // 중앙 정렬 (선택사항)
                    }}
                >
                    {isEditMode && (
                        <Form.Check
                            type="radio"
                            name="voiceSelect"
                            value={voice.id}
                            checked={selectedVoiceId === voice.id}
                            onChange={() => setSelectedVoiceId(voice.id)} // ✅ 선택한 항목 변경
                            style={{marginRight: "10px"}}
                        />
                    )}

                    {voice.name}
                </Card>
            ))}
        </>
    );
};

export default VoiceListComponent;
