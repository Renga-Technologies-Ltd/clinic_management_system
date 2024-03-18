import React from "react";
import { Input, Row, Col, Card, Form, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";

const NextOfKin = (props) => (
  <Col xs={24} sm={24} md={17}>
    <Card title="Basic Info">
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
          <Form.Item label="Relationship" name={["nextOfKin", "relationship"]}>
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
    <Card>
      
    </Card>
  </Col>
);

export default NextOfKin;
