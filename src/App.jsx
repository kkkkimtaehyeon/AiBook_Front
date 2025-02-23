import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Login from "./page/Login.jsx";
import Index from "./page/Index.jsx";
import {LoginLoading} from "./page/LoginLoading.jsx";
import {SignUp} from "./page/SignUp.jsx";
import NewBaseStory from "./page/NewBaseStory.jsx";
import NewStory from "./page/NewStory.jsx";
import NewStoryComplete from "./page/NewStoryComplete.jsx";
import StoryDetail from "./page/StoryDetail.jsx";
import Layout from "./layout/Layout.jsx";
import useLoginStore from "./store/useLoginStore.js";
import "./css/root.css"
import MyPage from "./page/MyPage.jsx";
import MemberInfo from "./page/MemberInfo.jsx";
import MyStoryList from "./page/MyStoryList.jsx";
import StoryDubbing from "./page/StoryDubbing.jsx";

function App() {
    useLoginStore();

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Index/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/login/oauth2/code/kakao" element={<LoginLoading/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/story/new" element={<NewBaseStory/>}/>
                    <Route path="/stories/:storyId/pages/:pageNumber/new" element={<NewStory/>}/>
                    <Route path="/stories/:storyId/new/complete" element={<NewStoryComplete/>}/>
                    <Route path="/stories/:storyId" element={<StoryDetail/>}/>
                    <Route path="/stories/:storyId/dubbing" element={<StoryDubbing />}/>
                    <Route path="/my" element={<MyPage/>}>
                        <Route path="info" element={<MemberInfo/>}/>
                        <Route path="story/list" element={<MyStoryList/>}/>
                    </Route>
                </Routes>
            </Layout>


        </BrowserRouter>
    );
}

export default App;
