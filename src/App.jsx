import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';

import Login from "./page/auth/Login.jsx";
import {LoginLoading} from "./page/auth/LoginLoading.jsx";
import {SignUp} from "./page/auth/SignUp.jsx";
import "./css/root.css"
import "/src/css/global.css"
import "bootstrap/dist/css/bootstrap.min.css";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import Footer2 from "./layout/Footer2.jsx";
import HomePage from "./page/main/HomePage.jsx";
import TaleDiscoveryPage from "./page/main/TaleDiscoveryPage.jsx";
import MyPageMainPage from "./page/mypage/MyPageMainPage.jsx";
import MyStoryListPage from "./page/mypage/MyStoryListPage.jsx";
import MyVoiceListPage from "./page/mypage/MyVoiceListPage.jsx";
import MyDubbingListPage from "./page/mypage/MyDubbingListPage.jsx";
import NewStorySettingPage from "./page/newStory/NewStorySettingPage.jsx";
import NewStoryPage from "./page/newStory/NewStoryPage.jsx";
import NewBaseStoryPage from "./page/newStory/NewBaseStoryPage.jsx";
import MyAccountPage from "./page/mypage/MyAccountPage.jsx";
import StoryReadPage from "./page/readStory/StoryReadPage.jsx";
import NewDubbingPage from "./page/newDubbing/NewDubbingPage.jsx";
import NewStoryCoverPage from "./page/newStory/NewStoryCoverPage.jsx";
import StoryDubbingReadPage from "./page/readStoryDubbing/StoryDubbingReadPage.jsx";
import VoiceRegisterPage from "./page/voice/VoiceRegisterPage.jsx";

function App() {

    return (
        <BrowserRouter>
            {/*<Layout>*/}
            <Routes>
                {/*메인*/}
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/discovery" element={<TaleDiscoveryPage/>}/>
                {/*로그인*/}
                <Route path="/login" element={<Login/>}/>
                <Route path="/login/oauth2/code/kakao" element={<LoginLoading/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                {/*마이페이지*/}
                <Route path="/my" element={<MyPageMainPage/>}/>
                <Route path="/my/account" element={<MyAccountPage/>}/>
                <Route path="/my/stories" element={<MyStoryListPage/>}/>
                <Route path="/my/voices" element={<MyVoiceListPage/>}/>
                <Route path="/my/dubbings" element={<MyDubbingListPage/>}/>
                {/*동화*/}
                <Route path="/story/new" element={<NewBaseStoryPage/>}/>
                <Route path="/stories/:storyId" element={<StoryReadPage/>}/>
                <Route path="/stories/:storyId/new" element={<AuthenticatedRoute component={<NewStoryPage/>}/>}/>
                <Route path="/stories/:storyId/new/setting" element={<NewStorySettingPage/>}/>
                <Route path="/stories/:storyId/new/cover" element={<NewStoryCoverPage/>}/>
                {/*더빙*/}
                <Route path="/dubbing/new" element={<NewDubbingPage/>}/>
                <Route path="/dubbing-stories/:storyDubbingId" element={<StoryDubbingReadPage/>}/>
                {/*<Route path="/dubbing/new" element={<NewDubbingStorySelectionPage/>}/>*/}
                {/*목소리*/}
                <Route path="/my/voices/register" element={<VoiceRegisterPage/>}/>

            </Routes>
            {/*</Layout>*/}
            <Footer2/>
        </BrowserRouter>
    );
}

export default App;
