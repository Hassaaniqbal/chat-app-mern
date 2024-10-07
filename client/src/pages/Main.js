import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../redux/authSlice';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isVerifying } = useSelector((state) => state.auth);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Show success message for 2 seconds after login
  useEffect(() => {
    if (isAuthenticated) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate('/signin');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  if (isVerifying) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {showSuccessMessage && <div>Successfully logged in!</div>}
      <h1>Main Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Main;