import React from "react";
import { Form, Input } from "antd";
import "../styles/RegisterStyles.css";
import { Link } from "react-router-dom";
const Register = () => {
    //form handler
    const onfinishHandler = (values) => {
        console.log(values);
    };
    return (
        <>
            <div className="form_contrainer">
                <Form
                    layout="vertical"
                    onFinish={onfinishHandler}
                    className="register-form"
                >
                    <h3 className="text-center">Register Form</h3>
                    <Form.Item label="Name" name="name">
                        <Input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" required />
                    </Form.Item>
                    <Link to="/login" className="login-link">
                        Already have an account? Login here
                    </Link>
                    <br />
                    <button className="btn btn-primary mt-3" type="submit">
                        Register
                    </button>
                </Form>
            </div>
        </>
    );
};

export default Register;
