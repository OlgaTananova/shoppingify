import './Navbar.css';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li
          className="navbar__link navbar__link_type_items"
          title="items"
        >
          <NavLink
            to="/items"
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
            className={({ isActive }: { isActive: boolean }) => `navbar__navlink ${isActive
              ? 'navbar__navlink_active' : ''}`}
          />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
