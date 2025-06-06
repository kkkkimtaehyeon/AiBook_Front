import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";

const useMyDubbingList = () => {
    const [searchParams] = useSearchParams();
    const [dubbingStories, setDubbingStories] = useState([]);
    const [totalPages, setTotalPages] = useState(); // 전체 페이지 수
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyDubbedStoryList();
    }, [searchParams]);

    const fetchMyDubbedStoryList = () => {
        const params = searchParams.toString();
        jwtAxios.get(`/api/stories/my/dubbed-stories?${params}`)
            .then(res => {
                if (res.status === 200) {
                    setDubbingStories(res.data.data.content);
                    setTotalPages(res.data.data.totalPages);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function addNewDubbingStory() {
        navigate("/dubbing/new");
    }

    function goToDubbingStoryDetail(dubbingStoryId) {
        navigate(`/dubbing-stories/${dubbingStoryId}`)
    }

    return {
        dubbingStories,
        totalPages,
        addNewDubbingStory,
        goToDubbingStoryDetail
    }
}
export default useMyDubbingList;