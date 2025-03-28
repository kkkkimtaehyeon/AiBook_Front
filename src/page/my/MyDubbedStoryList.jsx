import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const MyDubbedStoryList = () => {

    return (
        <>
            <Button as={Link} to={"/dubbing/new"}>
                + 추가하기
            </Button>
        </>
    );
}

export default MyDubbedStoryList;