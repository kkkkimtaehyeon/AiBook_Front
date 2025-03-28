import React, {useEffect, useState} from 'react';
import {Button, Col, Dropdown, FormControl, InputGroup, Row} from 'react-bootstrap';
import PaginationComponent from '../components/PaginationComponent.jsx';
import {useStoryList} from '../hooks/useStoryList';
import StoryListComponent from '../components/StoryListComponent.jsx';
import {useGoToStoryDetail} from "../utils/goToStoryDetail.js";
import StorySearchBarComponent from "../components/StorySearchBarComponent.jsx";
import SortingComponent from "../components/SortingComponent.jsx";
import {useSearchParams} from "react-router-dom";
import axios from "axios";

function StoryListContainer() {
    const goToStoryDetail = useGoToStoryDetail();
    const [storyList, setStoryList] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchStoryList();
    }, [searchParams]);

    const fetchStoryList = () => {
        const params = searchParams.toString();

        axios.get(`http://localhost:8080/api/stories?${params}`)
            .then(response => {
                setStoryList(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            })
            .catch(error => {
                console.error("Error fetching stories:", error);
            });
    }

    return (
        <>
            {/* 검색창 및 정렬 */}
            <Row className="mt-3 mb-3">
                <Col xs={12} md={6}>
                    <StorySearchBarComponent />
                </Col>
                <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                    <SortingComponent />
                </Col>
            </Row>

            {/* 스토리 리스트 */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                <StoryListComponent
                    storyList={storyList}
                    clickHandler={goToStoryDetail}
                />
            </Row>

            {/* 페이지네이션 */}
            <Row className="mt-4">
                <PaginationComponent
                    totalPages={totalPages}
                />
            </Row>
        </>
    );
}

export default StoryListContainer;