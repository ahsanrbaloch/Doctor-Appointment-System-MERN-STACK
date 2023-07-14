import React from "react";
import { Form, Input } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
const Login = () => {
    const onfinishHandler = (values) => {
        console.log(values);
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
