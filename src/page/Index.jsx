import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Index() {
    const [storyList, setStoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/stories")
            .then((response) => {
                console.log(response.data.data);
                const responseData = response.data.data;
                const storyList = responseData.content.map((story, index) => {
                    return (
                        <div key={index} onClick={() => goToStoryDetail(story.storyId)}>
                            <span>{story.title}</span>
                            <span>{story.memberName}</span>
                        </div>
                    )
                });
                setStoryList(storyList);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const goToStoryDetail = (storyId) => {
        navigate(`/stories/${storyId}/pages/0`);
    }

    //TODO: 멤버 이름 누르면 멤버가 작성한 동화 목록 나오게

    return (
        <>
            <h1>메인 페이지입니다.</h1>
            <Link to="/login">로그인</Link>
            <Link to={"/story/new"}>동화 만들기</Link>
            <div className={"story-container"}>
                {storyList}
            </div>
        </>
    );
}

export default Index;