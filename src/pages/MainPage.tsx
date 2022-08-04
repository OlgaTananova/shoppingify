import Logo from "../components/Logo/Logo";
import Header from "../components/Header/Header";
import Authbar from "../components/Authbar/Authbar";
import React, {useEffect} from "react";
import {useAppSelector} from "../store/hooks";
import {useNavigate} from "react-router-dom";


const MainPage = () => {
    const isLoggedIn = useAppSelector(state=> state.profile.isLoggedIn);
    const navigate = useNavigate();

    useEffect(()=> {
        if (isLoggedIn) {
            navigate('/items');
        }
    }, [isLoggedIn, navigate])

     return (
       <>
           <Logo />
           <Header />
           <Authbar />
       </>
   )
}

export default MainPage;
