import "antd/dist/reset.css";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import UserT from "../types/user.type";
import { Form, Input, Button, Select } from "antd";
import { register } from "../services/auth.service";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { api } from "./common/http-common";

const Register: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();
  const initialValues: UserT = {
    username: "",
    email: "",
    password: "",
    role: "user",
    actiCode: "",
    region: ""
  };
  const [regions, setRegions] = useState([]);
  React.useEffect(() => {
    axios.get(`${api.uri}/regions`).then((resp) => {
      setRegions(resp.data)
    });
  }, []);
  const handleRegister = (values: UserT) => {
    const { username, email, password, actiCode, region } = values;

    register(username, email, password, actiCode, region)
      .then((response) => {
        window.alert(
          `Welcome ${username} pls login to access your account profile`
        );
        console.log(response.data);
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        window.alert(
          `Sorry ${username} Something wrong with your registration! Pls try again with another username`
        );
        console.log(error.toString());

        navigate("/register");
        window.location.reload();
      });
  };

  return (
    <div className="p-10 flex flex-col justify-center content-center items-center">
      <h3 className="pb-6">
        {" "}
        <strong className="text-2xl">Welcome to Blog Registration</strong>
      </h3>
      <Form
        layout="vertical"
        name="normal_register"
        initialValues={initialValues}
        onFinish={handleRegister}
        rootClassName="w-96"
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
          name="email"
          label="Email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
        >
          <Input placeholder="emails" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item required name="region" label="Region" rules={[
          {
            required: true,
            message: "Please select your region"
          },
        ]}>
          <Select options={
            regions.map((r: any) => {
              return {
                value: r.region
              }
            })
          } />
        </Form.Item>
        <Form.Item name="actiCode" label="Activation Code">
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="secret code for internal staff(optional)"
          />
        </Form.Item>

        <Form.Item className="flex justify-center pt-6">
          <Button className="w-40" type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
