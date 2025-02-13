import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import jwtAxios from "../common/JwtAxios.js";
import {Button} from "react-bootstrap";

const NewStoryComplete = () => {
    const navigate = useNavigate();
    const titleInputRef = useRef(null);
    const [isPublic, setIsPublic] = useState(false);
    const {storyId} = useParams();

    const completeMakingStory = () =>  {
        const data = {
            title: titleInputRef.current.value,
            isPublic: isPublic
        }
        jwtAxios.patch(`http://localhost:8080/api/stories/${storyId}/complete`, data)
            .then((response) => {
                alert("동화가 성공적으로 만들어졌습니다.");
                if (response.data.code === 'CREATED') {
                    navigate(`/stories/${storyId}/pages/1`);
                }

            })
            .catch((error) => {
                alert(error);
            })
    }

    return (
        <>
            <h1>마지막으로 동화책의 제목을 지어주세요!</h1>
            <div>
                <label>제목</label>
                <input
                    type={"text"}
                    ref={titleInputRef}
                />
            </div>
            <div>
                <label>공개</label>
                <input
                    role={"switch"}
                    type={"checkbox"}
                    checked={isPublic}
                    onChange={(e) => {setIsPublic(e.target.checked)}
                }
                />
            </div>
            <Button onClick={() => completeMakingStory() }>저장</Button>
        </>
    )
}

export default NewStoryComplete;