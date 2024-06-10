import "antd/dist/reset.css";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Form, Input, Button, Checkbox, Modal } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../services/auth.service";

const Login: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isShow, setIsShow] = React.useState(false);
  const onFinish = (values: any) => {
    const { username, password } = values;

    setMessage("");
    setLoading(true);

    login(username, password)
      .then(() => {
        if (localStorage.getItem("user")) navigate("/profile");
        window.location.reload();
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        window.alert(
          `Sorry ${username} you may not have account in our system yet! pls try again or register first`
        );
        console.log(error.toString());
        setLoading(false);
        setMessage(resMessage);
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <>
      <Button
        icon={<LoginOutlined />}
        onClick={() => {
          setIsShow(true);
        }}
      />
      <Modal
        open={isShow}
        onCancel={() => {
          setIsShow(false);
        }}
        title="Welcome Blogger"
        footer={[]}
        width={400}
      >
        <Form
          name="normal_login"
          rootClassName="px-10 pt-4 flex flex-col"
          layout="vertical"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <div className="flex justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password?
            </a>
          </div>
          <Form.Item className="self-center mb-2">
            <Button className="w-40" type="primary" htmlType="submit">
              Log in
            </Button>
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
