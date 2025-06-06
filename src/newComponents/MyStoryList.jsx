import MyStoryCard from "./MyStoryCard.jsx";

const MyStoryList = ({
                         stories = [],
                         onStoryClick,
                         imageUrl,
                         emptyMessage = "등록된 동화가 없습니다."
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
                <MyStoryCard
                    key={story.storyId}
                    story={story}
                    imageUrl={imageUrl}
                    onClick={onStoryClick}
                />
            ))}
        </>
    );
};

export default MyStoryList;