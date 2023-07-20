import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";
// import axios from "axios";

export default function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const res = await axios.post(
                    "/api/v1/user/getUserData",
                    {},
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                if (res.data.success) {
                    dispatch(setUser(res.data.data));
                } else {
                    <Navigate to="/login" />;
                    localStorage.clear();
                }
            } catch (error) {
                localStorage.clear();
                console.log(error);
            }
        };

        if (!user) {
            getUserData();
        }
    }, [dispatch, user]);
    if (localStorage.getItem("token")) {
        return children;
    } else return <Navigate to="/login" />;
}
