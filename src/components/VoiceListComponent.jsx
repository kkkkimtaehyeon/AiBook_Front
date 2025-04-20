import {Card, Form} from "react-bootstrap";

const VoiceListComponent = ({clickHandler, voices, isEditMode = false, selectedVoiceId, setSelectedVoiceId}) => {
    return (
        <>
            {voices.map((voice) => (
                <Card
                    key={voice.id}
                    onClick={() => clickHandler(voice.id)}
                    style={{cursor: "pointer", marginBottom: "10px", display: "flex", alignItems: "center", padding: "10px"}}
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
