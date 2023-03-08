import './Logo.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import logo from '../../images/logo.svg';
import { useAppDispatch } from '../../store/hooks';
import { setLogoHeight } from '../../store/appSlice';
import { throttle } from '../../utils/utils';

function Logo() {
  const logoHeight = useRef<null | HTMLAnchorElement | Element >(null);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onResize: EventListener = throttle(() => {
    logoHeight.current
    && dispatch(setLogoHeight(logoHeight.current?.clientHeight));
  });

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  useEffect(() => {
    logoHeight.current
    && dispatch(setLogoHeight(logoHeight.current?.clientHeight));
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
