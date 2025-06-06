import {Button} from "react-bootstrap";

const SortingButtons = ({ sortOptions, onSort, onTagToggle }) => {
    return (
        <div className="d-flex overflow-x-auto">
            <Button
                variant="light"
                className="rounded-pill text-dark text-nowrap me-2"
                onClick={onTagToggle}
            >
                태그
            </Button>
            {sortOptions.map((sortOption, index) => (
                <Button
                    key={index}
                    variant="light"
                    className="rounded-pill text-nowrap me-2"
                    onClick={() => onSort(index)}
                >
                    {sortOption.displayName}
                </Button>
            ))}
        </div>
    );
};

export default SortingButtons;