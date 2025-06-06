import {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import PageHeader from "../../newComponents/PageHeader.jsx";
import SearchBar from "../../newComponents/SearchBar.jsx";
import SortingButtons from "../../newComponents/SortingButtons.jsx";
import TagFilter from "../../newComponents/TagFilter.jsx";
import StoryList from "../../newComponents/StoryList.jsx";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import useStoryDiscovery from "../../hooks/useStoryDiscovery.js";
import MyStoryList from "../../newComponents/MyStoryList.jsx";
import useMyStoryList from "../../hooks/useMyStoryList.js";

const NewDubbingStorySelectionPage = () => {
    const [activeTab, setActiveTab] = useState('all'); // 'all' or 'my'
    const [selectedStory, setSelectedStory] = useState(null);
    const navigate = useNavigate();
    const {
        stories,
        tags,
        searchKey,
        totalPages,
        tagOn,
        sortOptions,
        handleSorting,
        handleSearch,
        toggleTags,
        handleTagSelect
    } = useStoryDiscovery();

    const myStoryData = useMyStoryList();

    const handleStorySelect = (story) => {

        setSelectedStory(story);
    };

    const handleNext = () => {
        if (selectedStory) {
            // 선택된 스토리 정보와 함께 다음 페이지로 이동
            navigate('/dubbing/new?step=voice', {state: {selectedStory}});
        }
    };

    return (
        <Container className="py-4" style={{maxWidth: '500px', margin: '0 auto'}}>
            {/* 헤더 */}
            <PageHeader title={"더빙할 동화 선택"}/>

            {/* 탭 네비게이션 */}
            <Row className="mb-4">
                <Col className="d-flex justify-content-center">
                    <div
                        className="position-relative d-flex rounded-pill"
                        style={{
                            backgroundColor: '#e9ecef',
                            padding: '4px',
                            width: 'fit-content'
                        }}
                    >
                        {/* 슬라이딩 배경 */}
                        <div
                            className="position-absolute bg-white rounded-pill shadow-sm"
                            style={{
                                height: 'calc(100% - 8px)',
                                width: '50%',
                                top: '4px',
                                left: activeTab === 'all' ? '4px' : '50%',
                                transition: 'left 0.3s ease',
                                zIndex: 1
                            }}
                        />

                        {/* 버튼들 */}
                        <button
                            className="btn border-0 rounded-pill px-4 py-2 position-relative"
                            onClick={() => setActiveTab('all')}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#000',
                                fontWeight: activeTab === 'all' ? 'bold' : 'normal',
                                zIndex: 2,
                                transition: 'font-weight 0.3s ease',
                                minWidth: '120px'
                            }}
                        >
                            전체 동화
                        </button>
                        <button
                            className="btn border-0 rounded-pill px-4 py-2 position-relative"
                            onClick={() => setActiveTab('my')}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#000',
                                fontWeight: activeTab === 'my' ? 'bold' : 'normal',
                                zIndex: 2,
                                transition: 'font-weight 0.3s ease',
                                minWidth: '120px'
                            }}
                        >
                            내 동화
                        </button>
                    </div>
                </Col>
            </Row>

            {/* 선택된 탭에 따라 다른 내용 표시 */}
            {activeTab === 'all' ?
                // 전체 동화
                (
                    <>
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
                            onStoryClick={handleStorySelect}
                            onTagClick={handleTagSelect}
                        />

                        {/* 페이지네이션 */}
                        <Row style={{marginBottom: "100px"}}>
                            <PaginationComponent totalPages={totalPages}/>
                        </Row>
                    </>
                ) :
                // 내 동화
                (
                    <MyStoryList
                        stories={myStoryData.stories}
                        onStoryClick={handleStorySelect}
                    />

                )}

            {/* Next 버튼 */}
            <Button
                variant="primary"
                className="rounded-pill fw-bold"
                onClick={handleNext}
                disabled={!selectedStory}
                style={{
                    position: "fixed",
                    bottom: 100,
                    left: 15,
                    right: 15,
                    textAlign: "center",
                    cursor: "pointer",
                    zIndex: 1000
                }}
            >
                {selectedStory === null ? "동화를 선택해주세요." : `[ ${selectedStory.title} ] 더빙하기`}
            </Button>
        </Container>
    );
};

export default NewDubbingStorySelectionPage;