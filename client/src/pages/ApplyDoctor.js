import React from "react";
import Layout from "../components/Layout";
import Form from "antd/es/form/Form";
import { Col, Input, Row, TimePicker } from "antd";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
const ApplyDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //handle form
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/apply-doctor",
                { ...values },
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
                navigate("/");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };
    return (
        <Layout>
            <h1 className="text-center">Apply Doctor</h1>
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h4 className="">Personal Details</h4>

                <Row gutter={20}>
                    {/* First Row */}
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="First Name" name="firstname" required>
                            <Input type="text" placeholder="your first name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Last Name" name="lastname" required>
                            <Input type="text" placeholder="your last name" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Phone Number" name="phone" required>
                            <Input type="text" placeholder="your phone no" />
                        </Form.Item>
                    </Col>

                    {/* Second Row */}
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Email" name="email" required>
                            <Input
                                type="email"
                                placeholder="your email address"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website">
                            <Input type="text" placeholder="your website" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Address" name="address" required>
                            <Input type="text" placeholder="your address" />
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className="">Professional Details</h4>

                <Row gutter={20}>
                    {/* First Row */}
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Specialization"
                            name="specialization"
                            required
                        >
                            <Input
                                type="text"
                                placeholder="your specialization"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Experience"
                            name="experience"
                            required
                        >
                            <Input type="text" placeholder="your experience" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item
                            label="Fees Per Consultation"
                            name="feesPerConsultation"
                            required
                        >
                            <Input type="text" placeholder="your fees" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Timings" name="timings" required>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button
                            className="btn btn-primary form-btn"
                            type="Submit"
                        >
                            Submit
                        </button>
                    </Col>

                    {/* Second Row */}
                </Row>
            </Form>
        </Layout>
    );
};

export default ApplyDoctor;
