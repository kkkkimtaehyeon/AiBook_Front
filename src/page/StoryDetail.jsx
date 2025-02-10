import {useParams} from "react-router-dom";

const StoryDetail = () => {
    const {storyId} = useParams();
    
    
    return (
        <>
            <h1>동화 상세</h1>
        </>
    );
}

export default StoryDetail;