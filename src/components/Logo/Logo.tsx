import './Logo.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg'

const Logo = () => {
    return (
        <Link to={'/'}
              className={'logo'}>
            <img className={'logo-img'} src={logo} alt={'Logo'}/>
        </Link>
    )
}

export default Logo;
