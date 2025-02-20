import {Pagination} from "react-bootstrap";

const PaginationComponent = ({currentPage, totalPages, handlePageChange}) => {

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
