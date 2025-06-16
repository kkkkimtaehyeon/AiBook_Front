import {useState} from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';
import {useNavigate, useSearchParams} from 'react-router-dom';
import PageHeader from "../../newComponents/PageHeader.jsx";
import SearchBar from "../../newComponents/SearchBar.jsx";
import SortingButtons from "../../newComponents/SortingButtons.jsx";
import TagFilter from "../../newComponents/TagFilter.jsx";
import StoryList from "../../newComponents/StoryList.jsx";
import PaginationComponent from "../../components/PaginationComponent.jsx";
import useStoryDiscovery from "../../hooks/useStoryDiscovery.js";
import MyStoryList from "../../newComponents/MyStoryList.jsx";
import useMyStoryList from "../../hooks/useMyStoryList.js";
import VoiceCardList from "../../newComponents/VoiceCardList.jsx";
import useMyVoiceList from "../../hooks/useMyVoiceList.js";
import jwtAxios from "../../common/JwtAxios.js";

const NewDubbingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const step = searchParams.get('step') || 'story';

    // Story Selection States
    const [activeTab, setActiveTab] = useState('all');
    const [selectedStory, setSelectedStory] = useState(null);

    // Voice Selection States
    const [selectedVoice, setSelectedVoice] = useState(null);

    // Hooks
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
    const {myVoices, defaultVoices} = useMyVoiceList();

    // Story Selection Handlers
    const handleStorySelect = (story) => {
        setSelectedStory(story);
    };

    const handleNextToVoice = () => {
        if (selectedStory) {
            setSearchParams({step: 'voice'});
        }
    };

    // Voice Selection Handlers
    const handleVoiceSelect = (voice) => {
        setSelectedVoice(voice);
    };

    const handleRequestDubbing = () => {
        jwtAxios.post('/dubbed-stories', {
            storyId: selectedStory.storyId,
            voiceId: selectedVoice.id
        }).then(res => {
            if (res.status === 200) {
                alert('동화를 더빙하는 중입니다. 잠시만 기다려주세요.');
                navigate('/my/dubbings'); // 더빙 목록으로 이동
            }
        }).catch(err => {
            alert('더빙 요청에 실패했습니다. 다시 시도해주세요.');
            console.log('더빙 요청 실패:', err);
        });
    };

    // Story Selection UI
    const renderStorySelection = () => (
        <Container className={"py-4"}>
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
            {activeTab === 'all' ? (
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
            ) : (
                <MyStoryList
                    stories={myStoryData.stories}
                    onStoryClick={handleStorySelect}
                />
            )}

            {/* Next 버튼 */}
            <Button
                variant="primary"
                className="rounded-pill fw-bold"
                onClick={handleNextToVoice}
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

    // Voice Selection UI
    const renderVoiceSelection = () => (
        <Container className={"py-4 container"}>
            <PageHeader title={"더빙할 목소리 선택"}/>

            <Row className="mb-4 bg-light border" style={{height: 50}}>
                <Col className="d-flex align-items-center justify-content-start">
                    <h5 className={"fw-bold m-0"}>기본 목소리</h5>
                </Col>
            </Row>

            {/* 기본 목소리 목록 */}
            <Row className="mb-4">
                <VoiceCardList
                    voices={defaultVoices}
                    onClick={handleVoiceSelect}
                />
            </Row>

            <Row className="mb-4 bg-light border" style={{height: 50}}>
                <Col className="d-flex align-items-center justify-content-start">
                    <h5 className={"fw-bold m-0"}>내 목소리</h5>
                </Col>
            </Row>

            {/* 내 목소리 목록 */}
            <Row className="mb-4">
                <VoiceCardList
                    voices={myVoices}
                    onClick={handleVoiceSelect}
                />
            </Row>

            {/* 더빙 요청 버튼 */}
            <Button
                variant="primary"
                className="rounded-pill fw-bold"
                onClick={handleRequestDubbing}
                disabled={!selectedVoice}
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
                {selectedVoice === null ? "목소리를 선택해주세요." : `[ ${selectedVoice.name} ]로 더빙하기`}
            </Button>
        </Container>
    );

    // 단계에 따라 다른 UI 렌더링
    if (step === 'voice') {
        return renderVoiceSelection();
    }

    return renderStorySelection();
};

export default NewDubbingPage;