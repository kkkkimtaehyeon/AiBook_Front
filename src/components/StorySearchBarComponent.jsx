"use client"

import {Button, FormControl, InputGroup} from "react-bootstrap"
import {useRef, useState} from "react"
import {useSearchParams} from "react-router-dom"
import "/src/css/components/story/storySearchBarComponent.css" // Import custom styles

const StorySearchBarComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchKey, setSearchKey] = useState("")
    const searchKeyRef = useRef(null);

    const clickSearch = () => {
        const currentSearchKey = searchKeyRef.current.value

        // 상태와 URL 동시 업데이트
        setSearchKey(currentSearchKey)

        // 현재 입력값으로 URL 파라미터 설정
        searchParams.set("searchTarget", "title") // searchTarget: 검색 기준 (일단 고정)
        searchParams.set("searchKey", currentSearchKey)
        setSearchParams(searchParams)
        console.log("search key: ", currentSearchKey)
    }

    // Enter 키 이벤트 처리
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            clickSearch()
        }
    }

    return (
        <InputGroup className="custom-search-bar">
            <FormControl
                type="text"
                placeholder="제목 검색"
                ref={searchKeyRef}
                defaultValue={searchKey}
                className="search-input"
                onKeyPress={handleKeyPress}
            />
            <Button onClick={clickSearch} className={"btn-light"}>
                검색
            </Button>
        </InputGroup>
    )
}

export default StorySearchBarComponent

