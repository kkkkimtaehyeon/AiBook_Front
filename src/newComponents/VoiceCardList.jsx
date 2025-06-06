import VoiceCard from "./VoiceCard.jsx";

const VoiceCardList = ({voices, onClick}) => {
    return (
        <>
            {voices.map((voice) => (
                <VoiceCard
                    key={voice.id}
                    voice={voice}
                    onClick={onClick}
                />
            ))}
        </>
    );
}

export default VoiceCardList;