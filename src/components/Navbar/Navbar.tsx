import './Navbar.css';
import {NavLink} from "react-router-dom";
import {MouseEventHandler} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {setShowMobileSLFalse, setShowMobileSLTrue} from "../../store/appSlice";

const Navbar = () => {
    const activeShoppingList = useAppSelector(state => state.shopping.items);
    const dispatch = useAppDispatch();
    const showMobileSL = useAppSelector(state => state.app.showMobileSL);
    const scroll = useAppSelector(state => state.app.scroll);

    const handleSLIconClick: MouseEventHandler = () => {
        if (!showMobileSL) {
            dispatch(setShowMobileSLTrue())
        } else {
            dispatch(setShowMobileSLFalse());
        }

    }

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
