import './Logo.css';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import logo from '../../images/logo.svg';
import { useAppDispatch } from '../../store/hooks';
import { setLogoHeight } from '../../store/appSlice';

function Logo() {
  const logoHeight = useRef<null | HTMLAnchorElement | Element >(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onResize: EventListener = useCallback(() => {
    logoHeight.current
    && dispatch(setLogoHeight(window.getComputedStyle(logoHeight.current)
      .height.slice(0, -2)));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  useEffect(() => {
    logoHeight.current
    && dispatch(setLogoHeight(window.getComputedStyle(logoHeight.current)
      .height.slice(0, -2)));
  }, []);

  return (
    <Link
      to="/"
      className={`logo ${(location.pathname === '/login'
              || location.pathname === '/'
              || location.pathname === '/signup') && 'logo_backgroundgrey'}`}
      ref={function fixLogoHeight(node) {
        logoHeight.current = node;
        return logoHeight.current;
      }}
    >
      <img className="logo-img" src={logo} alt="Logo" />
    </Link>
  );
}

export default Logo;