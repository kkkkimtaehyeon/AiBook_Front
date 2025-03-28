import {Button, FormControl, InputGroup} from "react-bootstrap";
import React, {useState} from "react";
import {useSearchParams} from "react-router-dom";

const StorySearchBarComponent = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKey, setSearchKey] = useState("");
    const searchKeyRef = React.useRef(null);


    const onSearchClick = () => {
        setSearchKey(searchKeyRef.current.value);
        searchParams.append("searchKey", searchKey);
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
                <Button onClick={onSearchClick}>검색</Button>
            </InputGroup>
        </>
        );
}
export default StorySearchBarComponent;