import {Navigate} from "react-router-dom";
import useLoginStore from "./store/useLoginStore.js";

const AuthenticatedRoute = ({component: Component}) => {
    const isLogin = useLoginStore(state => state.isLogin); // ✅ → false

    if (isLogin) {
        return <Component/>;
    } else {
        alert("로그인이 필요한 서비스입니다.");
        return <Navigate to='/login'/>;
    }


};

export default AuthenticatedRoute;