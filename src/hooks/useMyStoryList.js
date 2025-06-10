import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jwtAxios from "../common/JwtAxios.js";

const useMyStoryList = () => {
    const [searchParams] = useSearchParams();
    const [stories, setStories] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyStories();
    }, [searchParams]);

    const fetchMyStories = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = searchParams.toString();
            const response = await jwtAxios.get(`/stories/my?${params}`);

            if (response.status === 200) {
                setStories(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            }
        } catch (err) {
            setError(err);
            if (err.status === 401 || err.status === 403) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStoryClick = (story) => {
        // 스토리 클릭 시 동작 정의
        navigate(`/stories/${story.storyId}`);
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleMenuClick = () => {
        // 메뉴 클릭 시 동작 정의
        console.log("Menu clicked");
    };

    return {
        stories,
        totalPages,
        loading,
        error,
        handleStoryClick,
        handleBackClick,
        handleMenuClick,
        refetch: fetchMyStories
    };
};

export default useMyStoryList;