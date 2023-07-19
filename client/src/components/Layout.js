import React from "react";
import "../styles/LayoutStyles.css";
import { UserMenu, adminMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { clearUser } from "../redux/features/userSlice";

const Layout = ({ children }) => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const dispatch = useDispatch();

    //logout function
    const handleLogout = () => {
        localStorage.clear();
        dispatch(clearUser());
        message.success("Logout Successfully");
    };
    //rendering menu list
    const SidebarMenu = user?.isAdmin ? adminMenu : UserMenu;
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
                            <div className={"menu-item"} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
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
