import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import alertReducer from '../features/alert/alertSlice';

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    user: userReducer,
  },
});

export default store;
