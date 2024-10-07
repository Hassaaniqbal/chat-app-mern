import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success('Logged in successfully');
      navigate('/');
    } catch (error) {
      message.error(error.message || 'Failed to log in');
    }
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', padding: '20px' }}>
      <Col xs={24} sm={16} md={12} lg={8} xl={6}>
        <div className="login-container">
          <h1 style={{ textAlign: 'center' }}>Login</h1>
          <Form name="login" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: '100%' }}
                loading={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <span>Not registered? </span>
              <Link to="/signup">
                <Button type="link" style={{ padding: 0 }}>
                  Sign up
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;