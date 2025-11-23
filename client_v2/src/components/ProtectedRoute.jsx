import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../features/alertSlice";
import { setUser } from "../features/userSlice";
import api from "../services/api";

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await api.post("/user/getUserData");
            dispatch(hideLoading());
            if (res.data.success) {
                dispatch(setUser(res.data.data));
            } else {
                localStorage.clear();
            }
        } catch (error) {
            dispatch(hideLoading());
            localStorage.clear();
            console.log(error);
        }
    };

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user]);

    if (localStorage.getItem("token")) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}
