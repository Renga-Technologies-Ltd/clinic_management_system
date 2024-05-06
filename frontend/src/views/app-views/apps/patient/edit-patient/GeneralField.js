import React, { useState } from "react";
import { Input, Row, Tab, Col, Card, Form, Select, DatePicker } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const GeneralField = ({ initialValues }) => {
  // Provide default values for initialValues if it is null
  initialValues = initialValues || {};

  // console.log("initialValues:", initialValues);

  // Destructure initial values with default values
  const {
    firstName = "",
    lastName = "",
    dateOfBirth = null,
    gender = "",
    patient_id = "",
    contactNumber = "",
    address = {},
    nextOfKin = {},
  } = initialValues;

  // Initialize patient age state
  const [patientAge, setPatientAge] = useState(null);

  // Function to calculate patient age based on date of birth
  const handleDateChange = (date) => {
    if (date) {
      const today = new Date();
      const birthDate = new Date(date);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      setPatientAge(age);
    } else {
      setPatientAge(null);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item
            label="Patient ID"
            name="patient_id"
            initialValue={patient_id}
            disabled
            // rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="First Name" />
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                initialValue={firstName}
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                initialValue={lastName}
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Last Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Date of Birth"
                initialValue={dateOfBirth ? moment(dateOfBirth) : null} // Convert date to moment object if not null
                name="dateOfBirth"
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={handleDateChange}
                />
              </Form.Item>
              {patientAge !== null && <p>Patient Age: {patientAge}</p>}
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Gender"
                name="gender"
                initialValue={gender}
                rules={[
                  { required: true, message: "Please select patient's gender" },
                ]}
              >
                <Select placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Contact Number"
                name="contactNumber"
                initialValue={contactNumber}
                rules={[
                  { required: true, message: "Please enter contact number" },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Contact Number"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Address">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Street"
                name={["address", "street"]}
                initialValue={address?.street}
              >
                <Input placeholder="Street" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="City"
                name={["address", "city"]}
                initialValue={address?.city}
              >
                <Input placeholder="City" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="State"
                name={["address", "state"]}
                initialValue={address?.state}
              >
                <Input placeholder="State" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Postal Code"
                name={["address", "postalCode"]}
                initialValue={address?.postalCode}
              >
                <Input placeholder="Postal Code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Country"
                name={["address", "country"]}
                initialValue={address?.country}
              >
                <Input placeholder="Country" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Next Of Kin">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name={["nextOfKin", "firstName"]}
                initialValue={nextOfKin?.firstName}
              >
                <Input placeholder="Next of Kin First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name={["nextOfKin", "lastName"]}
                initialValue={nextOfKin?.lastName}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Relationship"
                name={["nextOfKin", "relationship"]}
                initialValue={nextOfKin?.relationship}
              >
                <Input placeholder="Relationship" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Contact Number"
                name={["nextOfKin", "contactNumber"]}
                initialValue={nextOfKin?.contactNumber}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Contact Number"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
