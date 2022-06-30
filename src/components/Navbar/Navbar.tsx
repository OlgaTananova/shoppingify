import './Navbar.css';
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

const Navbar = () => {
    const [scroll, setScroll] = useState<number>(0);

    const onScroll: EventListener = () => {
        setScroll(window.scrollY);
    }
    useEffect(()=> {
        const win: Window = window;
        win.addEventListener('scroll', onScroll);
        return (() =>
            window.removeEventListener('scroll', onScroll)
        )
    },[])
    return (
        <nav className={`navbar ${scroll > 100? 'navbar_fullscreen': ''}`}>
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
