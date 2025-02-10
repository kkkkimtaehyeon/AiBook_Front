import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import useStoryStore from "../store/useStoryStore.js";
import jwtAxios from "../common/JwtAxios.js";

const NewBaseStory = () => {
    const navigate = useNavigate();
    const baseStoryInputRef = useRef(null);
    const {setStoryId, restoreState, setExStory} = useStoryStore();

    useEffect(() => {
        restoreState(); // 새로고침 시 기존 storyId 복구
    }, [restoreState]);

    const saveBaseStory = async () => {
        let content = baseStoryInputRef.current.value
        if (content === "") {
            alert("나의 이야기를 작성해주세요.");
            return;
        }
        try {
            const response = await jwtAxios.post("http://localhost:8080/api/stories/base-story", {baseStory: content});

            if (response) {
                const responseData = response.data;
                if (responseData.code === 'CREATED') {
                    const storyId = responseData.data;
                    setStoryId(storyId);
                    setExStory(content);
                    navigate(`/stories/${storyId}/pages/1/new`);
                }
            }

        } catch (error) {
            if (error.status === 403 || error.status === 401) {
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login")
                return;
            }
            console.log(error);
        }
    }


    return (
        <>
            <h1>나의 이야기</h1>
            <div>
                <textarea
                    ref={baseStoryInputRef}
                    placeholder={"동화로 만들고 싶은 나의 이야기를 작성해주세요."}>
                </textarea>
            </div>
            <div>
                <button onClick={saveBaseStory}>다음 단계</button>
            </div>

        </>
    );

}
export default NewBaseStory;