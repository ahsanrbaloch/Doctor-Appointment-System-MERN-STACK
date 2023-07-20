import React from "react";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/userSlice";
import axios from "axios";
const NotificationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    //handle read notification
    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/get-all-notification",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(setUser(res.data.data));
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
    //handle delete notification

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/delete-all-notification",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                dispatch(setUser(res.data.data));
            } else message.error(res.data.message);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something Went Wrong in Notifications");
        }
    };
    return (
        <Layout>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4
                            className="p-2"
                            onClick={handleMarkAllRead}
                            style={{ cursor: "pointer" }}
                        >
                            Mark All Read
                        </h4>
                    </div>
                    {user?.notification?.map((notification) => (
                        <div className="card" style={{ cursor: "pointer" }}>
                            <div
                                className="card-text"
                                onClick={() =>
                                    navigate(notification.onClickPath)
                                }
                            >
                                {notification.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>

                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4
                            className="p-2 text-primary"
                            onClick={handleDeleteAllRead}
                            style={{ cursor: "pointer" }}
                        >
                            Delete All Read
                        </h4>
                    </div>
                    {user?.seennotification.map((notification) => (
                        <div className="card" style={{ cursor: "pointer" }}>
                            <div
                                className="card-text"
                                onClick={() =>
                                    navigate(notification.onClickPath)
                                }
                            >
                                {notification.message}
                            </div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
};

export default NotificationPage;
