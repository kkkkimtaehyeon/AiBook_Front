import {useNavigate} from "react-router-dom";

const usePageHeader = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return {
        goBack,
    }
}
export default usePageHeader;