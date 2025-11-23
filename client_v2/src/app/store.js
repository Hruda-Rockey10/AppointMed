import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import alertReducer from "../features/alertSlice";

export default configureStore({
    reducer: {
        alerts: alertReducer,
        user: userReducer,
    },
});
