import './Authbar.css';
import { Link } from 'react-router-dom';

function Authbar() {
  return (
    <div className="auth-bar">
      <Link className="auth-bar__link auth-bar__link_type_login" to="/login">
        Login
      </Link>
      <Link className="auth-bar__link" to="/signup">
        Sign-up
      </Link>
    </div>
  );
}

export default Authbar;
