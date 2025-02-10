import {useEffect, useState} from "react";
import useStoryStore from "../store/useStoryStore.js";
import {useNavigate, useParams} from "react-router-dom";
import jwtAxios from "../common/JwtAxios.js";

const NewStory = () => {
    const {storyId} = useParams();
    const [pageNumber, setPageNumber] = useState(1);
    const navigate = useNavigate();
    const {exStory, setExStory} = useStoryStore();
    const [contentOption1, setContentOption1] = useState("");
    const [contentOption2, setContentOption2] = useState("");
    const [contentOption3, setContentOption3] = useState("");
    const [selectedContent, setSelectedContent] = useState("");
    const [loading, setLoading] = useState(false);
    // useEffect(() => {
    //     restoreState(); // 새로고침 시 기존 상태 복구
    //     setStoryId(storyId);
    //     setPageNumber(Number(pageNumber));
    // }, [storyId, pageNumber, restoreState, setStoryId, setPageNumber]);

    useEffect(() => {
        if (exStory) {
            const generateStoryOptions = async () => {
                setLoading(true);

                try {
                    // GPT에게 문장후보 생성 요청
                    const data = {
                        source: exStory,
                        pageNumber: pageNumber,
                    }
                    const response = await jwtAxios.post("http://localhost:8000/api/story/generate", data);
                    // 문장후보 생성 성공 시 출력
                    if (response) {
                        setContentOption1(response.data.contentOption1);
                        setContentOption2(response.data.contentOption2);
                        setContentOption3(response.data.contentOption3);
                        setLoading(false);
                    }

                } catch (error) {
                    console.log(error);
                }
            };
            generateStoryOptions();
        }
    }, [pageNumber]);

    // 다음 페이지로 이동
    const goToNextPage = () => {
        const url = `http://localhost:8080/api/stories/${storyId}/pages/${pageNumber}`;
        jwtAxios.post(url, {
            selectedContent: selectedContent
        })
            .then((response) => {
                console.log(response);
                if (response.data.code === 'CREATED') {
                    // 이전 페이지에 선택한 문장을 저장
                    console.log(response);
                    const nextPage = Number(pageNumber) + 1;
                    if (nextPage <= 10) {
                        setExStory(selectedContent);
                        console.log("지난 이야기: " + exStory);
                        setPageNumber(nextPage);

                    } else {
                        navigate(`/stories/${storyId}/new/complete`);
                    }

                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const selectContentOption = (selectedContent) => {
        setSelectedContent(selectedContent);
        console.log("selectedContent: " + selectedContent);
    }

    return (
        <>
            <h1>{pageNumber} 페이지</h1>
            <div>
                <h3>이전 내용</h3>
                <p>{exStory}</p>
            </div>
            {loading ? (<p>문장 생성중...</p>) :
                (
                    <div className={"content-container"}>
                        <h3>다음 내용을 선택해주세요.</h3>
                        <div>
                            <div onClick={() => selectContentOption(contentOption1)}>
                                <span>{contentOption1}</span>
                            </div>
                            <div onClick={() => selectContentOption(contentOption2)}>
                                <span>{contentOption2}</span>
                            </div>
                            <div onClick={() => selectContentOption(contentOption3)}>
                                <span>{contentOption3}</span>
                            </div>
                        </div>
                    </div>
                )
            }


            <button onClick={() => goToNextPage()}>다음 페이지</button>
        </>
    );

}
export default NewStory;