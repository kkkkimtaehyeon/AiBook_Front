import {useRef} from "react";
import {FormControl} from "react-bootstrap";
import {Search} from "lucide-react";

// eslint-disable-next-line react/prop-types
const SearchBar = ({ onSearch, defaultValue = "", placeholder = "검색하세요." }) => {
    const searchKeyRef = useRef(null);

    const handleSearch = () => {
        const searchValue = searchKeyRef.current.value;
        onSearch(searchValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="position-relative">
            <Search
                className="position-absolute"
                style={{
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#6c757d',
                    zIndex: 1
                }}
                size={20}
            />
            <FormControl
                type="text"
                placeholder={placeholder}
                className="ps-5 py-3 rounded-pill bg-light border-0"
                ref={searchKeyRef}
                defaultValue={defaultValue}
                onKeyUp={handleKeyPress}
                style={{ fontSize: '16px' }}
            />
        </div>
    );
};

export default SearchBar;