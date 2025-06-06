
import { Container, Row, Col } from "react-bootstrap";
import useStoryDiscovery from "../../hooks/useStoryDiscovery.js";
import SearchBar from "../../newComponents/SearchBar.jsx";
import SortingButtons from "../../newComponents/SortingButtons.jsx";
import TagFilter from "../../newComponents/TagFilter.jsx";
import StoryList from "../../newComponents/StoryList.jsx";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import Navigation from "../../newComponents/Navigation.jsx";

const TaleDiscoveryPage = () => {
    const {
        stories,
        tags,
        searchKey,
        totalPages,
        tagOn,
        sortOptions,
        goToStoryDetail,
        handleSorting,
        handleSearch,
        toggleTags,
        handleTagSelect
    } = useStoryDiscovery();

    const navigationItems = [
        { path: "/home", label: "홈" },
        { path: "/discovery", label: "동화" }
    ];

    return (
        <Container className="py-4">
            <Row>
                <Navigation items={navigationItems} />
            </Row>

            {/* 검색창 */}
            <Row className="mb-4">
                <Col>
                    <SearchBar
                        onSearch={handleSearch}
                        defaultValue={searchKey}
                        placeholder="동화 제목으로 검색하세요."
                    />
                </Col>
            </Row>

            {/* 정렬 */}
            <Row className="mb-3">
                <Col>
                    <SortingButtons
                        sortOptions={sortOptions}
                        onSort={handleSorting}
                        onTagToggle={toggleTags}
                    />
                </Col>
            </Row>

            {/* 태그 필터 */}
            <Row className="mb-3">
                <TagFilter
                    tags={tags}
                    onTagSelect={handleTagSelect}
                    isVisible={tagOn}
                />
            </Row>

            {/* 동화 목록 */}
            <StoryList
                stories={stories}
                onStoryClick={goToStoryDetail}
                onTagClick={handleTagSelect}
            />

            {/* 페이지네이션 */}
            <Row className="mb-5">
                <PaginationComponent totalPages={totalPages} />
            </Row>
        </Container>
    );
};

export default TaleDiscoveryPage;