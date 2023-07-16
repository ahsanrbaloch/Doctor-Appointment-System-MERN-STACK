import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/features/userSlice";
import { Navigate } from "react-router-dom";

const HomePage = () => {
    //login user data
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

    return (
        <Layout>
            <h1>Home Page</h1>
        </Layout>
    );
};

export default HomePage;
