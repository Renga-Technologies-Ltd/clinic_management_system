import React from "react";
import { Row, Col, Card, Form } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import moment from "moment";

const GeneralField = (props) => {
  const { patientData } = props;

  const firstName = patientData?.patient?.firstName || "";
  // console.log(firstName);
  const lastName = patientData?.patient?.lastName || "";
  const dateOfBirth = patientData?.patient?.dateOfBirth || null;
  const gender = patientData?.patient?.gender || "";
  const emailAddress = patientData?.patient?.emailAddress || "";
  const contactNumber = patientData?.patient?.contactNumber || "";
  const street = patientData?.patient?.address?.street || "";
  const city = patientData?.patient?.address?.city || "";
  const state = patientData?.patient?.address?.state || "";
  const postalCode = patientData?.patient?.address?.postalCode || "";
  const country = patientData?.patient?.address?.country || "";

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="First Name" name="firstName">
                <span>{firstName}</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Last Name" name="lastName">
                <span>{lastName}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <span>
                  {moment(dateOfBirth).format("MMMM Do YYYY")}
                  {}
                </span>
                <span>; Age: {moment().diff(dateOfBirth, "years")}</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Gender" name="gender">
                <span>{gender}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Contact Email" name="emailAddress">
                <span>
                  {" "}
                  <MailOutlined /> {emailAddress}
                </span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Contact Number" name="contactNumber">
                <span>
                  <PhoneOutlined />
                  {contactNumber}
                </span>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Address">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="street" name={["address", "street"]}>
                <span>{street}</span>
              </Form.Item>
              <Form.Item label="city" name={["address", "city"]}>
                <span>{city}</span>
              </Form.Item>
              <Form.Item label="state" name={["address", "state"]}>
                <span>{state}</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="postal code" name={["address", "postalCode"]}>
                <span>{postalCode}</span>
              </Form.Item>
              <Form.Item label="country" name={["address", "country"]}>
                <span>{country}</span>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Patient Photo"></Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
