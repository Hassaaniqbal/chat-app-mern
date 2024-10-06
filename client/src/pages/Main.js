import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // For redirection
import axios from 'axios'; // For sending requests to the server
import { logout } from '../redux/authSlice'; // Redux logout action

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleLogout = async () => {
    try {
      // Send a request to the server to clear the token cookie
      await axios.post('http://localhost:5000/api/auth/logout', {}, {
        withCredentials: true, // Ensure cookies are included in the request
      });

      // Dispatch the logout action to clear Redux state
      dispatch(logout());

      // Redirect to the login page
      navigate('/signin'); // Redirecting to the login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Main;
