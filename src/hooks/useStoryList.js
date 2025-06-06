import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {api} from "../common/CustomAxios.js";

export const useStoryList = () => {
    const [storyList, setStoryList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchKey, setSearchKey] = useState('');
    const [sortOption, setSortOption] = useState({
        displayName: "최신순",
        sortBy: "createdAt",
        sortDir: "desc"
    });

    const location = useLocation();
    const navigate = useNavigate();

    const sortOptions = [
        {
            displayName: "최신순",
            sortBy: "createdAt",
            sortDir: "desc",
        },
        {
            displayName: "오래된순",
            sortBy: "createdAt",
            sortDir: "asc",
        },
        {
            displayName: "조회수 높은순",
            sortBy: "viewCount",
            sortDir: "desc",
        },
        {
            displayName: "조회수 낮은순",
            sortBy: "viewCount",
            sortDir: "asc",
        },
        {
            displayName: "좋아요 많은순",
            sortBy: "likeCount",
            sortDir: "desc",
        },
        {
            displayName: "좋아요 적은순",
            sortBy: "likeCount",
            sortDir: "asc",
        }
    ];

    // Parse query parameters on component mount and when location changes
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageParam = searchParams.get('page');
        const searchKeyParam = searchParams.get('searchKey');
        const sortByParam = searchParams.get('sortBy');
        const sortDirParam = searchParams.get('sortDir');

        if (pageParam) setCurrentPage(parseInt(pageParam));
        if (searchKeyParam) setSearchKey(searchKeyParam);

        // Find matching sort option
        if (sortByParam && sortDirParam) {
            const matchedSort = sortOptions.find(
                option => option.sortBy === sortByParam && option.sortDir === sortDirParam
            );
            if (matchedSort) setSortOption(matchedSort);
        }
    }, [location.search]);

    // Fetch stories based on current state
    const fetchStories = () => {
        const params = new URLSearchParams();

        params.set("page", currentPage);
        params.set("sortBy", sortOption.sortBy);
        params.set("sortDir", sortOption.sortDir);

        if (searchKey) {
            params.set("searchTarget", "title");
            params.set("searchKey", searchKey);
        }

        api.get(`?${params}`)
            .then(response => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching stories:", error);
            });
    };

    // Trigger fetch when relevant states change
    useEffect(() => {
        fetchStories();
    }, [currentPage, sortOption, searchKey]);

    // Update URL to reflect current state
    useEffect(() => {
        const params = new URLSearchParams();

        if (currentPage > 0) params.set('page', currentPage);
        if (searchKey) params.set('searchKey', searchKey);
        params.set('sortBy', sortOption.sortBy);
        params.set('sortDir', sortOption.sortDir);

        navigate(`?${params}`, { replace: true });
    }, [currentPage, searchKey, sortOption]);

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearch = (key) => {
        setSearchKey(key);
        setCurrentPage(0);
    };

    const handleSortChange = (sortIndex) => {
        setSortOption(sortOptions[sortIndex]);
    };

    return {
        storyList,
        currentPage,
        totalPages,
        searchKey,
        sortOption,
        sortOptions,
        handlePageChange,
        handleSearch,
        handleSortChange
    };
};