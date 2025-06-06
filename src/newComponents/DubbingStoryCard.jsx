import {Dot} from "react-bootstrap-icons";

const DubbingStoryCard = ({
                              dubbingStory,
                              image = "/public/assets/image_loading.jpg",
                              onClick
                          }) => {
    const getImageUrl = (story) => {
        return story.coverImageUrl ? story.coverImageUrl : "/public/assets/image_loading.jpg";
    }

    return (
        <div
            className="d-flex align-items-start mb-3"
            onClick={() => onClick?.(dubbingStory.id)}
        >
            <div className="me-3 flex-shrink-0">
                <img
                    src={getImageUrl(dubbingStory)}
                    alt={dubbingStory.title}
                    className="rounded"
                    style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        backgroundColor: "#f8f9fa"
                    }}
                />
            </div>
            <div className="flex-grow-1 text-start">
                <span className="fw-bold mb-2">{dubbingStory.title}</span>
                <p className="text-muted mb-0" style={{fontSize: '14px'}}>
                    {dubbingStory.writer}
                    <Dot/>
                    목소리: {dubbingStory.voiceName}
                </p>
            </div>
        </div>
    );
}

export default DubbingStoryCard;