import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const useStoryDiscovery = () => {
    const [stories, setStories] = useState([]);
    const [tags, setTags] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKey, setSearchKey] = useState("");
    const [totalPages, setTotalPages] = useState();
    const [tagOn, setTagOn] = useState(false);
    const navigate = useNavigate();

    const sortOptions = [
        {
            displayName: "최신순",
            sortBy: "createdAt",
            sortDir: "desc",
        },
        {
            displayName: "조회순",
            sortBy: "viewCount",
            sortDir: "desc",
        },
        {
            displayName: "좋아요순",
            sortBy: "likeCount",
            sortDir: "desc",
        },
    ];

    useEffect(() => {
        fetchStories();
        fetchTags();
    }, [searchParams]);

    const fetchStories = () => {
        const params = searchParams.toString();
        axios.get(`http://localhost:8080/api/stories?${params}`)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.data);
                    setStories(res.data.data.content);
                    setTotalPages(res.data.data.totalPages);
                }
            })
            .catch(error => {
                console.error("Error fetching stories:", error);
            });
    };

    const fetchTags = () => {
        axios.get("http://localhost:8080/api/tags")
            .then(res => {
                if (res.status === 200) {
                    setTags(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    const goToStoryDetail = (story) => {
        navigate(`/stories/${story.storyId}`);
    };

    const handleSorting = (sortByIndex) => {
        const selectedOption = sortOptions.at(sortByIndex);
        searchParams.set("sortBy", selectedOption.sortBy);
        searchParams.set("sortDir", selectedOption.sortDir);
        setSearchParams(searchParams);
    };

    const handleSearch = (searchValue) => {
        setSearchKey(searchValue);
        searchParams.set("searchTarget", "title");
        searchParams.set("searchKey", searchValue);
        setSearchParams(searchParams);
        console.log("search key: ", searchValue);
    };

    const toggleTags = () => {
        setTagOn(!tagOn);
    };

    const handleTagSelect = (tagId) => {
        setTagOn(true);
        searchParams.set("tagId", tagId);
        setSearchParams(searchParams);
    };

    return {
        stories,
        tags,
        searchKey,
        totalPages,
        tagOn,
        sortOptions,
        goToStoryDetail,
        handleSorting,
        handleSearch,
        toggleTags,
        handleTagSelect
    };
};

export default useStoryDiscovery;