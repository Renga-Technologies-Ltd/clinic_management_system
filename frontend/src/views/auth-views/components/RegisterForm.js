import React from "react";
import { connect } from "react-redux";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Card,
  Upload,
  message,
  Select,
} from "antd";

import {
  signUp,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
} from "store/slices/authSlice";

const { Dragger } = Upload;
const { Option } = Select;

export const RegisterForm = (props) => {
  const [form] = Form.useForm();
  const base_apiUrl = process.env.REACT_APP_BASE_URL;
  const rules = {
    email: [
      {
        required: true,
        message: "Please input User email address",
      },
      {
        type: "email",
        message: "Please enter a validate email!",
      },
    ],
    password: [
      {
        required: true,
        message: "Please input User password",
      },
    ],
    confirm: [
      {
        required: true,
        message: "Please confirm User password!",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject("Passwords do not match!");
        },
      }),
    ],
  };
  const onSignUp = async () => {
    try {
      const values = await form.validateFields();
      const formData = { ...values };
      const apiUrl = `${base_apiUrl}/adduser`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      // Make the API request
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        window.location.reload();
        form.resetFields();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="register-form"
        onFinish={onSignUp}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={17}>
            <Card title="User Info">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      { required: true, message: "Please enter first name" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      { required: true, message: "Please enter last name" },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Last Name" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={rules.email}
                    hasFeedback
                  >
                    <Input prefix={<MailOutlined className="text-primary" />} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please select user Role" },
                    ]}
                    label="Role"
                    name="roles"
                  >
                    <Select placeholder="Select Role">
                      <Option value="Doctor">Doctor</Option>
                      <Option value="Nurse">Nurse</Option>
                      <Option value="Reception">Reception</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="Phone number"
                    // rules={rules.password}
                    hasFeedback
                  >
                    <Input
                      prefix={<PhoneOutlined className="text-primary" />}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={rules.password}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-primary" />}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={7}>
            <Card title="">
              <Col>
                <Form.Item
                  name="medicalLicense"
                  label="Medical Licence"
                  hasFeedback
                >
                  <Input
                    prefix={
                      <MailOutlined
                        className="text-primary"
                        placeholder="Last Name"
                      />
                    }
                  />
                </Form.Item>
              </Col>
              <Col>
                <Dragger></Dragger>
              </Col>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  //   onClick={() => onSignUp(form.getFieldsValue())}
                >
                  Create User
                </Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signUp,
  showAuthMessage,
  hideAuthMessage,
  showLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
