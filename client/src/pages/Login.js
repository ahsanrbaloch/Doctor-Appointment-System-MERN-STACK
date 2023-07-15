import React from "react";
import { Form, Input, message } from "antd";
import "../styles/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/login", values);
            dispatch(hideLoading());
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                message.success("Login Success");
                navigate("/");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("somethign went wrong");
        }
    };
    return (
        <div className="form_contrainer">
            <Form
                layout="vertical"
                onFinish={onfinishHandler}
                className="register-form"
            >
                <h3 className="text-center">Login Form</h3>
                <Form.Item label="Email" name="email">
                    <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password" required />
                </Form.Item>
                <Link to="/register" className="register-link">
                    Don't have an account? Register here
                </Link>
                <br />
                <button className="btn btn-primary mt-3" type="submit">
                    Login
                </button>
            </Form>
        </div>
    );
};

export default Login;
