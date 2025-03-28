import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

const StorySearchBarComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKey, setSearchKey] = useState("");
    const searchKeyRef = React.useRef(null);


    const clickSearch = () => {
        const currentSearchKey = searchKeyRef.current.value;

        // 상태와 URL 동시 업데이트
        setSearchKey(currentSearchKey);

        // 현재 입력값으로 URL 파라미터 설정
        searchParams.set("searchTarget", "title"); // searchTarget: 검색 기준 (일단 고정)
        searchParams.set("searchKey", currentSearchKey);
        setSearchParams(searchParams);
        console.log("search key: ", currentSearchKey);
    };

    return (
        <>
            <InputGroup>
                <FormControl
                    type="text"
                    placeholder="제목 검색"
                    ref={searchKeyRef}
                    defaultValue={searchKey}
                />
                <Button onClick={clickSearch}>검색</Button>
            </InputGroup>
        </>
        );
}
export default StorySearchBarComponent;