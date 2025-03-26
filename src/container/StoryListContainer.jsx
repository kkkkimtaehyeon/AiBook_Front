import React from 'react';
import {Button, Col, Dropdown, FormControl, InputGroup, Row} from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent.jsx';
import {useStoryList} from '../hooks/useStoryList';
import StoryListView from '../components/StoryListComponent.jsx';

function StoryListContainer() {
    const {
        storyList,
        currentPage,
        totalPages,
        searchKey,
        sortOption,
        sortOptions,
        handlePageChange,
        handleSearch,
        handleSortChange
    } = useStoryList();

    const searchKeyRef = React.useRef(null);

    const onSearchClick = () => {
        const searchValue = searchKeyRef.current.value;
        handleSearch(searchValue);
    };

    return (
        <>
            {/* 검색창 및 정렬 */}
            <Row className="mt-3 mb-3">
                <Col xs={12} md={6}>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="제목 검색"
                            ref={searchKeyRef}
                            defaultValue={searchKey}
                        />
                        <Button onClick={onSearchClick}>검색</Button>
                    </InputGroup>
                </Col>
                <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">
                            {sortOption.displayName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {sortOptions.map((option, index) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => handleSortChange(index)}
                                >
                                    {option.displayName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* 스토리 리스트 */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                <StoryListView storyList={storyList}/>
            </Row>

            {/* 페이지네이션 */}
            <Row className="mt-4">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                />
            </Row>
        </>
    );
}

export default StoryListContainer;