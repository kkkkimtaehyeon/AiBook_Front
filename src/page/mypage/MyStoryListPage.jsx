import {Container, Row} from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import PageHeader from "../../newComponents/PageHeader.jsx";
import MyStoryList from "../../newComponents/MyStoryList.jsx";
import useMyStoryList from "../../hooks/useMyStoryList.js";

const MyStoryListPage = () => {
    const {stories, totalPages, handleStoryClick} = useMyStoryList();


    return (
        <Container className="py-4">
            {/* 헤더 */}
            <PageHeader title={"내 동화"}/>

            {/*/!* 로딩 상태 *!/*/}
            {/*{loading && <LoadingSpinner message="동화 목록을 불러오는 중..." />}*/}
            {/*/!* 에러 상태 *!/*/}
            {/*{error && !loading && (*/}
            {/*    <ErrorMessage*/}
            {/*        error={error}*/}
            {/*        onRetry={refetch}*/}
            {/*        message="동화 목록을 불러오는데 실패했습니다."*/}
            {/*    />*/}
            {/*)}*/}


            {/* 스토리 목록 */}
            <Row>
                <MyStoryList
                    stories={stories}
                    onStoryClick={handleStoryClick}
                />
            </Row>

            {/* 페이지네이션 */}
            <Row className="mb-5">
                <PaginationComponent
                    totalPages={totalPages}
                />
            </Row>
        </Container>
    );
}

export default MyStoryListPage;