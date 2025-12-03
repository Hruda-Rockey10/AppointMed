import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../features/alert/alertSlice';
import { setUser } from '../features/user/userSlice';
import { authService } from '../services/authService';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await authService.getCurrentUser();
      dispatch(hideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear();
      console.error('Failed to get user data:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  /* The Problem: When you refresh the page, Redux state is wiped clean. state.user becomes null, even if you have a token in localStorage.
The Solution: The useEffect hook runs automatically when the component loads.*/

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
