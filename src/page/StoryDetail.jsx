// import {useNavigate, useParams} from "react-router-dom";
// import {useEffect, useState} from "react";
// import axios from "axios";
//
// const StoryDetail = () => {
//     const navigate = useNavigate();
//     const {storyId, pageNumber} = useParams();
//     const [storyDetail, setStoryDetail] = useState({});
//
//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/stories/${storyId}`)
//             .then((response) => {
//                 if (response.data.success) {
//                     console.log(response.data.data);
//                     setStoryDetail(response.data.data);
//                 }
//             })
//             .catch(error => console.log(error));
//     }, [pageNumber]);
//
//     const renderStoryCover = () => {
//
//
//     }
//
//     const goToNextPage = () => {
//         const nextPageNumber = Number(pageNumber) + 1;
//         if (nextPageNumber <= 10) {
//             navigate(`/stories/${storyId}/pages/${nextPageNumber}`);
//         }
//     }
//
//     const goBackToPage = () => {
//         const nextPageNumber = Number(pageNumber) - 1;
//         if (nextPageNumber >= 0) {
//             navigate(`/stories/${storyId}/pages/${nextPageNumber}`);
//         }
//     }
//
//     const storyCover = () => {
//         return (
//             <div>
//                 <h1>{storyDetail.title}</h1>
//                 <h3>{storyDetail.author}</h3>
//             </div>
//         );
//     }
//
//     const storyPage = () => {
//         const currentPage = storyDetail.pages?.find(page => page.pageNumber === Number(pageNumber)) || {};
//
//         return (
//             <div>
//                 <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
//                 <p>{currentPage.pageNumber || 0}/10</p>
//             </div>
//         );
//     };
//
//
//
//     return (
//         <>
//             {pageNumber === "0" ? storyCover() : storyPage()}
//
//             <button onClick={goBackToPage}>이전 페이지</button>
//             <button onClick={goToNextPage}>다음 페이지</button>
//         </>
//     );
// }
//
// export default StoryDetail;
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const StoryDetail = () => {
    const navigate = useNavigate();
    const {storyId} = useParams();
    const [storyDetail, setStoryDetail] = useState({});
    const [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/stories/${storyId}`)
            .then((response) => {
                if (response.data.success) {
                    console.log(response.data.data);
                    setStoryDetail(response.data.data);
                }
            })
            .catch(error => console.log(error));
    }, [pageNumber]);

    const goToNextPage = () => {
        const nextPageNumber = Number(pageNumber) + 1;
        if (nextPageNumber <= 10) {
            setPageNumber(nextPageNumber);
        }
    }

    const goBackToPage = () => {
        const nextPageNumber = Number(pageNumber) - 1;
        if (nextPageNumber >= 0) {
            setPageNumber(nextPageNumber);

        }
    }

    const storyCover = () => {
        return (
            <div>
                <h1>{storyDetail.title}</h1>
                <h3>{storyDetail.author}</h3>
            </div>
        );
    }

    const storyPage = () => {
        const currentPage = storyDetail.pages?.find(page => page.pageNumber === Number(pageNumber)) || {};

        return (
            <div>
                <p>{currentPage.content || "페이지를 찾을 수 없습니다."}</p>
                <p>{currentPage.pageNumber || 0}/10</p>
            </div>
        );
    };

    return (
        <>
            {Number(pageNumber) === 0 ? storyCover() : storyPage()}

            <button onClick={goBackToPage}>이전 페이지</button>
            <button onClick={goToNextPage}>다음 페이지</button>
            <Link to={"/"}>목록보기</Link>
        </>
    );
}

export default StoryDetail;