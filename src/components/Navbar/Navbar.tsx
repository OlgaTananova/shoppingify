import './Navbar.css';
import {Link, NavLink} from "react-router-dom";
import {MouseEventHandler, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setShowMobileSLFalse, setShowMobileSLTrue} from "../../store/appSlice";

const Navbar = () => {
    const [scroll, setScroll] = useState<number>(0);
    const activeShoppingList = useAppSelector(state => state.shopping.items);
    const dispatch = useAppDispatch();
    const showMobileSL = useAppSelector(state => state.app.showMobileSL);

    const handleSLIconClick: MouseEventHandler = () => {
        if (!showMobileSL) {
            dispatch(setShowMobileSLTrue())
        } else {
            dispatch(setShowMobileSLFalse());
        }

    }

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
            <i className={'navbar__shopping-cart'} onClick={handleSLIconClick}
               about={`${activeShoppingList!.length}`}>{}</i>
        </nav>
    )
}

export default Navbar;
