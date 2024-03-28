import React from "react";
import { Input, Row, Col, Card, Form, Select, DatePicker } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { Option } = Select;

const GeneralField = (props) => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={17}>
      <Card title="Basic Info">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              rules={[
                { required: true, message: "Please enter Date of Birth" },
              ]}
              label="Date of Birth"
              name="dateOfBirth"
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              rules={[
                { required: true, message: "Please enter patients' Gender" },
              ]}
              label="Gender"
              name="gender"
            >
              <Select placeholder="Select gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              rules={[
                { required: true, message: "Please enter Contact Email" },
              ]}
              label="Contact Email"
              name="emailAddress"
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="patientemail@system.com"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="Contact Number" name="contactNumber">
              <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Address">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="street" name={["address", "street"]}>
              <Input placeholder="Street" />
            </Form.Item>
            <Form.Item label="city" name={["address", "city"]}>
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item label="state" name={["address", "state"]}>
              <Input placeholder="State" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="postal code" name={["address", "postalCode"]}>
              <Input placeholder="Postal Code" />
            </Form.Item>
            <Form.Item label="country" name={["address", "country"]}>
              <Input placeholder="Country" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Card title="Next Of Kin">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="First Name" name={["nextOfKin", "firstName"]}>
              <Input placeholder="Next of Kin First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="Last Name" name={["nextOfKin", "lastName"]}>
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Relationship"
              name={["nextOfKin", "relationship"]}
            >
              <Input placeholder="Relationship" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              label="Contact Number"
              name={["nextOfKin", "contactNumber"]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Contact Number" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
);

export default GeneralField;
