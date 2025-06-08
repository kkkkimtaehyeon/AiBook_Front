const VoiceCard = ({
                       voice,
                       image = "/assets/image_loading.jpg",
                       onClick
                   }) => {

    return (
        <div
            className="d-flex align-items-start"
            onClick={() => onClick?.(voice)}
        >
            <div className="me-3 flex-shrink-0">
                <img
                    src={image}
                    alt={voice.name}
                    className="rounded-circle"
                    style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        backgroundColor: "#f8f9fa"
                    }}
                />
            </div>
            <div className="flex-grow-1 text-start pt-2 mb-5">
                <span className="mb-2 fw-bold">{voice.name}</span>
                {/*<p className="text-muted mb-0" style={{fontSize: '14px'}}>*/}
                {/*    <Eye/> {voice.viewCount} <Heart/> {voice.likeCount}*/}
                {/*</p>*/}
            </div>
        </div>
    );
}

export default VoiceCard;