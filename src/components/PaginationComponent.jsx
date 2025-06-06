import {Pagination} from "react-bootstrap"
import {useSearchParams} from "react-router-dom"
import {useState} from "react"
import "/src/css/components/pagination.css" // Import the custom styles

const PaginationComponent = ({totalPages}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [page, setPage] = useState(searchParams.get("page") === null ? 0 : Number.parseInt(searchParams.get("page")))

    const changePage = (page) => {
        setPage(page)
        searchParams.set("page", page)
        setSearchParams(searchParams)
        console.log("current page: ", page)
    }

    return (
        <div className="pagination-container">
            <Pagination className="justify-content-center custom-pagination">
                <Pagination.Prev onClick={() => changePage(page - 1)} disabled={page === 0}
                                 className="pagination-nav-button"/>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index === Number.parseInt(page)}
                        onClick={() => changePage(index)}
                        className="pagination-number"
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages - 1}
                    className="pagination-nav-button"
                />
            </Pagination>
        </div>
    )
}

export default PaginationComponent
