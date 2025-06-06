import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './App.css';
import Login from "./page/auth/Login.jsx";
import {LoginLoading} from "./page/auth/LoginLoading.jsx";
import {SignUp} from "./page/auth/SignUp.jsx";
import NewBaseStory from "./page/NewBaseStory.jsx";
import NewStory from "./page/NewStory.jsx";
import NewStoryComplete from "./page/NewStoryComplete.jsx";
import StoryDetail from "./page/StoryDetail.jsx";
import "./css/root.css"
import EditStory from "./page/EditStory.jsx";
import VoiceCloning from "./page/VoiceCloning.jsx";
import StoryDubbingDetail from "./page/StoryDubbingDetail.jsx";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import SelfDubbingPage from "./page/SelfDubbingPage.jsx";
import TalePage from "./page/TalePage.jsx";
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
                <Route path="/" element={<Navigate to="/home" replace />} />
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
                <Route path="/stories/:storyId/new" element={<NewStoryPage/>}/>
                <Route path="/stories/:storyId/new/setting" element={<NewStorySettingPage/>}/>
                <Route path="/stories/:storyId/new/cover" element={<NewStoryCoverPage/>}/>
                {/*더빙*/}
                <Route path="/dubbing/new" element={<NewDubbingPage/>}/>
                <Route path="/dubbing-stories/:storyDubbingId" element={<StoryDubbingReadPage/>}/>
                {/*<Route path="/dubbing/new" element={<NewDubbingStorySelectionPage/>}/>*/}
                {/*목소리*/}
                <Route path="/my/voices/register" element={<VoiceRegisterPage/>}/>










                {/*<Route path="/" element={<Index/>}/>*/}
                <Route path="/tale" element={<TalePage/>}/>
                <Route path="/" element={<TalePage/>}/>

                <Route path="/story/new"
                       element={<AuthenticatedRoute component={NewBaseStory}/>}/>
                <Route path="/stories/:storyId/new" element={<NewStory/>}/>
                <Route path="/stories/:storyId/new/complete" element={<NewStoryComplete/>}/>
                <Route path="/stories/:storyId" element={<StoryDetail/>}/>
                <Route path="/stories/:storyId/edit" element={<EditStory/>}/>
                <Route path="/my/voices/new" element={<VoiceCloning/>}/>
                <Route path="/stories/:storyId/self-dubbing" element={<SelfDubbingPage/>}/>

                <Route path="/dubbing-stories/:storyDubbingId" element={<StoryDubbingDetail/>}/>
            </Routes>
            {/*</Layout>*/}
            <Footer2/>
        </BrowserRouter>
    );
}

export default App;
