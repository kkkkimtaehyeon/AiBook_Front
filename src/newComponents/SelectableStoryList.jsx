import SelectableStoryCard from "./SelectableStoryCard.jsx";

const SelectableStoryList = ({
                                 stories = [],
                                 selectedStory,
                                 onStorySelect,
                                 emptyMessage = "동화가 없습니다."
                             }) => {
    if (stories.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <>
            {stories.map((story) => (
                <SelectableStoryCard
                    key={story.id || story.storyId}
                    story={story}
                    isSelected={selectedStory?.id === story.id || selectedStory?.storyId === story.storyId}
                    onSelect={onStorySelect}
                />
            ))}
        </>
    );
};

export default SelectableStoryList;