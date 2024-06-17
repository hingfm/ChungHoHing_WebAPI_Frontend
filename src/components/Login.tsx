import "antd/dist/reset.css";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, loginWithGoogle } from "../services/auth.service";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';



const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isShow, setIsShow] = useState(false);
  const googleClientId = "866324759131-u9v5vrrjukgkegaj8r8iqhajc8lc3m2v.apps.googleusercontent.com";

  const onFinish = (values: any) => {
    const { username, password } = values;
    setLoading(true);
    login(username, password).then(() => {
      if (localStorage.getItem("user")) navigate("/profile");
      window.location.reload();
    }).catch((error) => {
      const resMessage = error.response?.data?.message || error.message || error.toString();
      window.alert(`Sorry ${username}, please try again or register first`);
      setLoading(false);
      setMessage(resMessage);
      navigate("/");
      window.location.reload();
    });
  };

  const handleLoginSuccess = async (response: any) => {
    console.log("Google login response received:", response);
    setLoading(true);
    try {
      console.log('Sending token to backend:', response.credential);
      const { data } = await loginWithGoogle({ token: response.credential });
      console.log("Backend response data:", data);
      if (data && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('aToken', data.token || '');
        window.location.reload(); // Reload to reflect changes
        navigate('/profile');
      } else {
        throw new Error('Login successful but no user data received.');
      }
    } catch (error) {
      console.error('Google Login failed:', error);
      setMessage('Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginFailure = () => {
    console.error("Google login failed");
    setMessage("Google login failed. Please try again.");
  };

  return (
    <>
      <Button
        icon={<LoginOutlined />}
        onClick={() => setIsShow(true)}
      >
        Log In
      </Button>
      <Modal
        open={isShow}
        onCancel={() => setIsShow(false)}
        title="Welcome Blogger"
        footer={[]}
        width={400}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
          <div className="flex justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <GoogleOAuthProvider clientId={googleClientId}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
              />
            </GoogleOAuthProvider>
          </Form.Item>
          <div className="text-center">
            <a href="/register">register now!</a>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Login;