import './Header.css';
import {useLocation} from "react-router-dom";

const Header = () => {
    const location = useLocation();
    return (
        <header className={`header ${(location.pathname === '/' || location.pathname === '/login'
            || location.pathname === '/signup') && 'header_type_authbar'}`}>
            <h1 className={'header__heading'}>{
                <span className={'header__heading-name'}>
                    Shoppingify</span>}{<span className={'header__heading-body'}> allows you take your shopping list
                                                wherever you go</span>} </h1>
        </header>
    )
}

export default Header;
