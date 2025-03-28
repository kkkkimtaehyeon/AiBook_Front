import {Pagination} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";

const PaginationComponent = ({totalPages}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(searchParams.get("page") === null ? 0 : searchParams.get("page"));

    const changePage = (page) => {
        setPage(page);
        searchParams.set("page", page);
        setSearchParams(searchParams);
        console.log("current page: ", page);
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev
                onClick={() => changePage(page - 1)}
                disabled={page === 0}
            />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index}
                    active={index === page}
                    onClick={() => changePage(index)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => changePage(page + 1)}
                disabled={page === totalPages - 1}
            />
        </Pagination>
    );

}
export default PaginationComponent;
