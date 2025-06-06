import { Eye, Heart } from "react-bootstrap-icons";

const SelectableStoryCard = ({
                                 story,
                                 isSelected,
                                 onSelect,
                                 imageUrl = "/public/assets/image_loading.jpg"
                             }) => {
    return (
        <div
            className={`d-flex mb-4 pb-4 border-bottom ${isSelected ? 'border-primary border-2' : ''}`}
            onClick={() => onSelect(story)}
            style={{
                cursor: 'pointer',
                backgroundColor: isSelected ? '#f8f9ff' : 'transparent',
                borderRadius: '8px',
                padding: '12px',
                transition: 'all 0.2s ease'
            }}
        >
            <div className="flex-grow-1 me-4">
                <h5 className="fw-bold mb-2 text-start">{story.title}</h5>
                <p className="text-muted mb-2 text-start small">{story.description}</p>
                <div className="text-start">
                    <span>by {story.writer || 'Unknown'}</span>
                    <br />
                    {story.viewCount !== undefined && (
                        <>
                            <span><Eye />{story.viewCount} · </span>
                            <span><Heart />{story.likeCount || 0}</span>
                        </>
                    )}
                </div>
                {story.tags && (
                    <div className="text-start mt-2">
                        {story.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="badge bg-light text-dark me-1"
                                style={{ fontSize: '10px' }}
                            >
                                # {tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-shrink-0 position-relative">
                <img
                    src={story.thumbnail || imageUrl}
                    alt={story.title}
                    className="rounded"
                    style={{ width: '120px', height: '100px', objectFit: 'cover' }}
                />
                {isSelected && (
                    <div
                        className="position-absolute top-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: '24px', height: '24px', fontSize: '12px', marginTop: '-8px', marginRight: '-8px' }}
                    >
                        ✓
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectableStoryCard;