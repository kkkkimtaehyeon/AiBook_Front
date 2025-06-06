import {Button, ButtonGroup} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";

const SortingButtonGroupComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
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
    ]

    const handleSortChange = (option) => {
        searchParams.set("sortBy", option.sortBy);
        searchParams.set("sortDir", option.sortDir);
        setSearchParams(searchParams);
    }

    return (
        <ButtonGroup role={"group"} className={"w-auto"}>
            {sortOptions.map((option, index) => (
                <Button
                    key={index}
                    onClick={() => handleSortChange(option)}
                    className={"btn-light"}
                >
                    {option.displayName}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default SortingButtonGroupComponent;