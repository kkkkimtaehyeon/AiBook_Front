import {Pagination} from "react-bootstrap";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";

const PaginationComponent = ({currentPage, totalPages, handlePageChange}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(currentPage);
    const changePage = (page) => {
        setPage(page);
        searchParams.append("page", page);
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
            />
            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index}
                    active={index === currentPage}
                    onClick={() => handlePageChange(index)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
            />
        </Pagination>
    );

}
export default PaginationComponent;
