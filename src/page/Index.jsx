import {Link} from "react-router-dom";

function Index() {
    return (
        <>
            <h1>메인 페이지입니다.</h1>
            <Link to="/login">로그인</Link>
            <Link to={"/story/new"}>동화 만들기</Link>
        </>
    );
}

export default Index;