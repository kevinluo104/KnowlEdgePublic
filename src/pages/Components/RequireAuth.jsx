import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../../firebase';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/signup');
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the onAuthStateChanged listener when the component unmounts
    };
  }, [auth, navigate]);

  return children;
};

export default RequireAuth;
