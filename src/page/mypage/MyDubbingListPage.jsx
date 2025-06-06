import {Container, Row} from "react-bootstrap";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import PageHeader from "../../newComponents/PageHeader.jsx";
import DubbingStoryCardList from "../../newComponents/DubbingStoryCardList.jsx";
import useMyDubbingList from "../../hooks/useMyDubbingList.js";
import {PlusLg} from "react-bootstrap-icons";

const MyDubbingListPage = () => {
    const {dubbingStories, goToDubbingStoryDetail, addNewDubbingStory, totalPages} = useMyDubbingList();

    return (
        <Container className="py-4">
            {/* 헤더 */}
            <PageHeader
                title={"내 더빙 목록"}
                rightIcon={PlusLg}
                onRightClick={addNewDubbingStory}
            />

            {/* 스토리 목록 */}
            <Row className={"mb-4"}>
                <DubbingStoryCardList
                    dubbingStories={dubbingStories}
                    onClick={goToDubbingStoryDetail}
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
export default MyDubbingListPage;