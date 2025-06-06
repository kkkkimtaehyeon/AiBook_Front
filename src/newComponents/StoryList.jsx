import { Row } from "react-bootstrap";
import StoryCard from "./StoryCard.jsx";

const StoryList = ({ stories, onStoryClick, onTagClick, title = "동화" }) => {
    return (
        <>
            <Row className="mb-4">
                <h3 className="fw-bold text-start">{title}</h3>
            </Row>
            <Row>
                {stories.map((story) => (
                    <StoryCard
                        key={story.storyId}
                        story={story}
                        onStoryClick={onStoryClick}
                        onTagClick={onTagClick}
                    />
                ))}
            </Row>
        </>
    );
};

export default StoryList;