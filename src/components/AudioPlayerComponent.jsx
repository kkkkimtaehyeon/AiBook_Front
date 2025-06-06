import {Pause, Play} from "react-bootstrap-icons";
import {useState} from "react";
import {Card} from "react-bootstrap";

const AudioPlayerComponent = ({audioUrl}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState(null);

    const playDubbingAudio = (audioUrl) => {
        setIsPlaying(true);
        const newAudio = new Audio(audioUrl);
        setAudio(newAudio);
        newAudio.play();
        newAudio.onended = () => setIsPlaying(false);
    }

    const stopDubbingAudio = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
        }
    }

    return (
        <Card>
            {audioUrl && (
                <div>
                    {isPlaying ?
                        <Pause onClick={stopDubbingAudio}/>
                        :
                        <Play onClick={() => {
                            playDubbingAudio(audioUrl)
                        }}/>
                    }
                </div>
            )}
        </Card>

    );
}

export default AudioPlayerComponent;