import {Dropdown} from "react-bootstrap";
import React from "react";
import {useSearchParams} from "react-router-dom";

const SortingComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortOption, setSortOption] = React.useState({
        displayName: "최신순",
        sortBy: "createdAt",
        sortDir: "desc",
    });

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

    const handleSortChange = (sortByIndex) => {
        const selectedOption = sortOptions.at(sortByIndex);
        setSortOption(selectedOption);

        searchParams.set("sortBy", selectedOption.sortBy);
        searchParams.set("sortDir", selectedOption.sortDir);
        setSearchParams(searchParams);
        console.log(`sortBy: ${sortOption.sortBy}, sortDir: ${sortOption.sortDir}`);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="secondary">
                    {sortOption.displayName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {sortOptions.map((option, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => handleSortChange(index)}
                        >
                            {option.displayName}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}
export default SortingComponent;