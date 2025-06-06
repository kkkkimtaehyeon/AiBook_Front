import DubbingStoryCard from "./DubbingStoryCard.jsx";

const DubbingStoryCardList = ({
                                  dubbingStories,
                                  onClick
                              }) => {

    return (
        <>
            {dubbingStories.map((dubbingStory) => (
                <DubbingStoryCard
                    key={dubbingStory.id}
                    dubbingStory={dubbingStory}
                    onClick={onClick}
                />
            ))}
        </>
    );

}
export default DubbingStoryCardList;