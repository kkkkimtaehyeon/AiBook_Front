import {Eye, Heart} from "react-bootstrap-icons";

const StoryCard = ({ story, onStoryClick, onTagClick }) => {

    const getImageUrl = (story) => {
        return story.coverImageUrl ? story.coverImageUrl : "/src/assets/image_loading.jpg";
    }
    return (
        <div
            className="d-flex mb-4 pb-4 border-bottom"
            onClick={() => onStoryClick(story)}
            style={{ cursor: 'pointer' }}
        >
            <div className="flex-grow-1 me-4">
                <h5 className="fw-bold mb-2 text-start">{story.title}</h5>
                <div className="text-start">
                    <span>by {story.writer}</span>
                    <br />
                    <span><Eye />{story.viewCount} · </span>
                    <span><Heart />{story.likeCount}</span>
                </div>
                {story.tags && (
                    <div className="text-start">
                        {story.tags.map((tag) => (
                            <button
                                className="tag-btn"
                                key={tag.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onTagClick(tag.id);
                                }}
                            >
                                # {tag.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-shrink-0">
                <img
                    src={getImageUrl(story)}
                    alt={story.title}
                    className="rounded-5"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
            </div>
        </div>
    );
};

export default StoryCard;