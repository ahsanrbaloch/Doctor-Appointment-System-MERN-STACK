import React from "react";
import "../styles/LayoutStyles.css";
import { SidebarMenu } from "../Data/data";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>DOC APP</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {SidebarMenu.map((item) => {
                                const isActive =
                                    location.pathname === item.path;
                                return (
                                    <div
                                        className={`menu-item ${
                                            isActive && "active"
                                        }`}
                                        key={item.path}
                                    >
                                        <i className={item.icon}></i>
                                        <Link to={item.path}>{item.name}</Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">
                                <i className="fa-solid fa-bell"></i>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
