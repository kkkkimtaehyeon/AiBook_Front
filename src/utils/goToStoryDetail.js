import {useNavigate} from "react-router-dom";


const useGoToStoryDetail = () => {
    const navigate = useNavigate();
    return (storyId) => {
        navigate(`/stories/${storyId}`);
    }
}

export {useGoToStoryDetail};