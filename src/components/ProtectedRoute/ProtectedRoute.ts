import {useAppSelector} from "../../store/hooks";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

function ProtectedRoute({children}: {children: JSX.Element}): JSX.Element | null {
    const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn);
    const navigate = useNavigate();

    useEffect(()=> {
        if (!isLoggedIn) {
            navigate('/');
        }
    },[isLoggedIn]);

    return (children);
}

export default ProtectedRoute;
