import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Main from './pages/Main';
import { verifyAuth } from './redux/authSlice';
import './App.css';
import ChatApp from './pages/Home'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isVerifying } = useSelector((state) => state.auth);

  if (isVerifying) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { isVerifying } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]); 

  if (isVerifying) {
    return <div>Verifying authentication...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Main />
          </ProtectedRoute>
        } />
        <Route path='/home' element={
          <ProtectedRoute>
            <ChatApp />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
