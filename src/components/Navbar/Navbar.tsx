import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setShowMobileSLFalse } from '../../store/appSlice';

function Navbar() {
  const dispatch = useAppDispatch();

  const handleLinkClick = () => {
    dispatch(setShowMobileSLFalse());
  };

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li
          className="navbar__link navbar__link_type_items"
          title="items"
        >
          <NavLink
            to="/items"
            onClick={handleLinkClick}
            title="items"
            className={({ isActive }: { isActive: boolean }) => `navbar__navlink ${isActive
              ? 'navbar__navlink_active' : ''}`}
          />
        </li>
        <li
          className="navbar__link navbar__link_type_history"
          title="history"
        >
          <NavLink
            to="/history"
            onClick={handleLinkClick}
            className={({ isActive }: { isActive: boolean }) => `navbar__navlink ${isActive
              ? 'navbar__navlink_active' : ''}`}
            title="history"
          />
        </li>
        <li
          className="navbar__link navbar__link_type_statistics"
          title="statistics"
        >
          <NavLink
            to="/statistics"
            onClick={handleLinkClick}
            className={({ isActive }: { isActive: boolean }) => `navbar__navlink ${isActive
              ? 'navbar__navlink_active' : ''}`}
          />
        </li>
        <li
          className="navbar__link navbar__link_type_profile"
          title="profile"
        >
          <NavLink
            to="/profile"
            onClick={handleLinkClick}
            className={({ isActive }: { isActive: boolean }) => `navbar__navlink ${isActive
              ? 'navbar__navlink_active' : ''}`}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
