import { MouseEventHandler, useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import './Sidebar.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setShowMobileSLFalse,
  setShowMobileSLTrue,
} from '../../store/appSlice';

function Sidebar() {
  const innerHeight = useAppSelector((state) => state.app.innerHeight);
  const activeShoppingList = useAppSelector((state) => state.shopping.items);
  const dispatch = useAppDispatch();
  const showMobileSL = useAppSelector((state) => state.app.showMobileSL);
  const [shoppingListItemQty, setShoppingListItemQty] = useState(0);
  const handleSLIconClick: MouseEventHandler = () => {
    if (!showMobileSL) {
      dispatch(setShowMobileSLTrue());
    } else {
      dispatch(setShowMobileSLFalse());
    }
  };

  useEffect(() => {
    setShoppingListItemQty(activeShoppingList?.length || 0);
  }, [activeShoppingList]);

  return (
    <nav className="sidebar" style={{ height: `${innerHeight}px` }}>
      <Logo />
      <Navbar />
      <button
        type="button"
        className="sidebar__shopping-cart"
        onClick={handleSLIconClick}
        aria-label={`${shoppingListItemQty}`}
      />
    </nav>
  );
}
export default Sidebar;
