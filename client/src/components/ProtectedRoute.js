import React from "react";
import { Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { showLoading } from "../redux/features/alertSlice";
// import axios from "axios";

export default function ProtectedRoute({ children }) {
    // const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.user);

    //get user
    // const getUser = async () => {
    //     try {
    //         dispatch(showLoading);
    //         const res = await axios.post("/api/v1/user/getUser");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    if (localStorage.getItem("token")) {
        return children;
    } else return <Navigate to="/login" />;
}
