import './Logo.css';
import {Link, useLocation} from "react-router-dom";
import logo from '../../images/logo.svg'
import {useEffect, useRef} from "react";
import {useAppDispatch} from "../../store/hooks";
import {setLogoHeight} from "../../store/appSlice";

const Logo = () => {
    const logoHeight = useRef<null | HTMLAnchorElement >(null);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(()=>{
    if (logoHeight.current) {
        const style = getComputedStyle(logoHeight.current);
        const height = Number((style.height.slice(0, -2)))
        dispatch(setLogoHeight(height));
    }
    }, [logoHeight.current])

    return (
        <Link to={'/'}
              className={`logo ${(location.pathname === '/login' 
              || location.pathname === '/signup')&& 'logo_backgroundgrey'}`} ref={logoHeight}>
            <img className={'logo-img'} src={logo} alt={'Logo'}/>
        </Link>
    )
}

export default Logo;
