import './Navbar.css';
import {Link, NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={'navbar'}>
            <ul className={'navbar__links'}>
                <li className={'navbar__link navbar__link_type_items'}
                    title={'items'}><NavLink to={'/items'}
                                             title={'items'}
                                             className={({isActive}: { isActive: boolean }) => {
                                                 return `navbar__navlink ${isActive ?
                                                     'navbar__navlink_active' : ''}`
                                             }}/></li>
                <li className={'navbar__link navbar__link_type_history'}
                    title={'history'}><NavLink to={'/history'}
                                               className={({isActive}: { isActive: boolean }) => {
                                                   return `navbar__navlink ${isActive ?
                                                       'navbar__navlink_active' : ''}`
                                               }}
                                               title={'history'}/></li>
                <li className={'navbar__link navbar__link_type_statistics'}
                    title={'statistics'}><NavLink to={'/statistics'}
                                                  className={({isActive}: { isActive: boolean }) => {
                                                      return `navbar__navlink ${isActive ?
                                                          'navbar__navlink_active' : ''}`
                                                  }}/></li>
                <li className={'navbar__link navbar__link_type_profile'}
                    title={'profile'}><NavLink to={'/profile'}
                                               className={({isActive}: { isActive: boolean }) => {
                                                   return `navbar__navlink ${isActive ?
                                                       'navbar__navlink_active' : ''}`
                                               }}/></li>
            </ul>
            <i className={'navbar__shopping-cart'}
               about={'0'}>{}</i>
        </nav>
    )
}

export default Navbar;
