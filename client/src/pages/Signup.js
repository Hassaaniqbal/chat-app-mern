import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

const Signup = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    const onFinish = async (values) => {
        try {
            await dispatch(registerUser({
                username: values.username,
                email: values.email,
                password: values.password
            })).unwrap();
            message.success('Registration successful!');
            navigate('/signin');
        } catch (error) {
            message.error(error.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px' }}>
            <Col xs={24} sm={16} md={12} lg={8} xl={6}>
                <div className="registration-container">
                    <h1 style={{ textAlign: 'center' }}>Register</h1>
                    <Form name="registration" layout="vertical" form={form} onFinish={onFinish}>
                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input your Email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                { required: true, message: 'Please confirm your password!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                    },
                }),
            ]}
        >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" size="large" style={{ width: '100%' }} loading={isLoading}>
                Register
            </Button>
        </Form.Item>
        

        {/* {error && (
    <Form.Item>
        <div style={{ color: 'red' }}>{error.message || 'An error occurred'}</div>
    </Form.Item>
)} */}

        {/* {error && (
            <Form.Item>
                <div style={{ color: 'red' }}>{error}</div>
            </Form.Item>
        )} */}

        <Form.Item style={{ textAlign: 'center' }}>
            <span>Already registered? </span>
            <Button type="link" style={{ padding: 0 }} onClick={() => navigate('/signin')}>
                Sign in
            </Button>
        </Form.Item>
    </Form>
</div>
</Col>
</Row>
    );
};

export default Signup;