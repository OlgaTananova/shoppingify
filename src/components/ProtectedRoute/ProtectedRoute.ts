import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';

function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}): JSX.Element | null {
  const isLoggedIn = useAppSelector((state) => state.profile.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);

  return children;
}

export default ProtectedRoute;
