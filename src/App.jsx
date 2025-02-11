import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'
import Login from "./page/Login.jsx";
import Index from "./page/Index.jsx";
import {LoginLoading} from "./page/LoginLoading.jsx";
import {SignUp} from "./page/SignUp.jsx";
import NewBaseStory from "./page/NewBaseStory.jsx";
import NewStory from "./page/NewStory.jsx";
import NewStoryComplete from "./page/NewStoryComplete.jsx";
import StoryDetail from "./page/StoryDetail.jsx";
import Layout from "./layout/Layout.jsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Index />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/login/oauth2/code/kakao",
            element: <LoginLoading />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/story/new",
            element: <NewBaseStory />
        },
        {
            path: "/stories/:storyId/pages/:pageNumber/new",
            element: <NewStory />
        },
        {
            path: "/stories/:storyId/new/complete",
            element: <NewStoryComplete />
        },
        // {
        //     path: "/stories/:storyId/pages/:pageNumber",
        //     element: <StoryDetail />
        // }
        {
            path: "/stories/:storyId",
            element: <StoryDetail />
        }
    ]);

    return (
        <Layout>
            <RouterProvider router={router} />
        </Layout>
    )
}

export default App
