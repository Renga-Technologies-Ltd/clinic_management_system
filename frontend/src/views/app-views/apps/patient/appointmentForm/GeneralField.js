import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Card,
  Form,
  Select,
  DatePicker,
  Space,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const { Option } = Select;

const GeneralField = (props) => {
  const [allPatients, setAllPatients] = useState([]);
  const [allDoctors, setAlldoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create a form instance
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const navigate = useNavigate();

  //get logged in user
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_apiUrl}/allpatient`);
      const data = await response.json();
      setAllPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_apiUrl}/getDoctors`);
      const data = await response.json();
      setAlldoctors(data.doctors);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (value) => {
    const foundPatient = allPatients.find(
      (patient) =>
        patient._id.toString() === value ||
        `${patient.firstName} ${patient.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    setSelectedPatient(foundPatient);

    // Auto-populate form fields if patient is found
    if (foundPatient) {
      form.setFieldsValue({
        firstName: foundPatient.firstName,
        lastName: foundPatient.lastName,
        dateOfBirth: foundPatient.dateOfBirth,
        gender: foundPatient.gender,
        emailAddress: foundPatient.emailAddress,
        contactNumber: foundPatient.contactNumber,
        address: {
          street: foundPatient.address.street,
          city: foundPatient.address.city,
          state: foundPatient.address.state,
          postalCode: foundPatient.address.postalCode,
          country: foundPatient.address.country,
        },
      });
    }
  };
  const addPatient = () => {
    navigate(`/app/apps/patient/add-patient`);
  };

  const handleFormChange = (changedFields, allFields) => {
    // Implement this function to handle form changes
    // You can use the changedFields to update the state or perform other actions
    // setSelectedPatientId(value);
  };
  const handleSelectChange = (value) => {
    // Handle the change of the selected patient ID here
    setSelectedPatientId(value);
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={17}>
                <Select
                  showSearch
                  placeholder="Search by ID or fullname"
                  optionFilterProp="children"
                  onSearch={handleSearch}
                  onChange={handleSelectChange} // Add this line
                  style={{ width: "100%" }}
                >
                  {allPatients.map((patient) => (
                    <Option key={patient._id} value={patient._id}>
                      {`${patient.firstName} ${patient.lastName}`}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={24} md={7}>
                <Button
                  onClick={addPatient}
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  block
                >
                  New Patient
                </Button>
              </Col>
            </Row>

            {loading ? (
              <LoadingOutlined className="font-size-xxl text-primary" />
            ) : selectedPatient ? (
              <>
                <Form
                  form={form}
                  onFieldsChange={handleFormChange}
                  initialValues={{
                    firstName: selectedPatient.firstName,
                    lastName: selectedPatient.lastName,
                    dateOfBirth: selectedPatient.dateOfBirth,
                    gender: selectedPatient.gender,
                    emailAddress: selectedPatient.emailAddress,
                    contactNumber: selectedPatient.contactNumber,
                    address: {
                      street: selectedPatient.address.street,
                      city: selectedPatient.address.city,
                      state: selectedPatient.address.state,
                      postalCode: selectedPatient.address.postalCode,
                      country: selectedPatient.address.country,
                    },
                    patient: selectedPatientId,
                  }}
                >
                  {/* Common form structure */}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Patient ID" name="patient">
                        <span>{selectedPatient._id}</span>
                        <Input
                          placeholder="First Name"
                          value={selectedPatient._id}
                          name="patient"
                          hidden
                        />
                      </Form.Item>
                      <Form.Item label="" name="createdBy" hidden>
                        <span>Dr. G B Mahapatra</span>
                        <Input
                          placeholder="First Name"
                          value="65d721ff1f2b413a05b5e914"
                          name="65d721ff1f2b413a05b5e914"
                          hidden
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="First Name" name="firstName">
                        <span>{selectedPatient.firstName}</span>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Last Name" name="lastName">
                        <span>{selectedPatient.lastName}</span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Date of Birth" name="dateOfBirth">
                        <span>{selectedPatient.dateOfBirth}</span>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Gender" name="gender">
                        <span>{selectedPatient.gender}</span>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Contact Email" name="emailAddress">
                        <span>
                          {" "}
                          <MailOutlined /> {selectedPatient.emailAddress}
                        </span>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12}>
                      <Form.Item label="Contact Number" name="contactNumber">
                        <span>
                          <PhoneOutlined />
                          {selectedPatient.contactNumber}
                        </span>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              <Form form={form} onFieldsChange={handleFormChange}>
                {/* Common form structure */}
                <Row gutter={16}>{/* ... existing form fields */}</Row>
              </Form>
            )}
          </Space>
        </Card>
        <Card title="Accompanied by">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Full Name" name={["accompaniedBy", "fullname"]}>
                <Input placeholder="Next of Kin First Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Relationship"
                name={["accompaniedBy", "relationship"]}
              >
                <Input placeholder="Relationship" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Contact Number"
                name={["accompaniedBy", "contactNumber"]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Contact Number"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Appointment Details">
          <Form.Item label="Doctor" name="doctor">
            <Select showSearch>
              {allDoctors.map((doctor) => (
                <Option key={doctor._id} value={doctor._id}>
                  {`${doctor.profile.firstName} ${doctor.profile.lastName}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Patient ID" name="patient">
            <Select placeholder="Select type">
              <Option value={selectedPatientId}>{selectedPatientId}</Option>
              {/* <Option value="walk-in">Walk-in</Option> */}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Appointment Date" name="appointmentTime">
                <DatePicker showTime />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Appointment type" name="bookingType">
                <Select placeholder="Select type">
                  <Option value="scheduled">Scheduled</Option>
                  <Option value="walk-in">Walk-in</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Booked by" name="bookedBy">
                <Select placeholder="bookedBy">
                  <Option value={userId}>{userId}</Option>
                  {/* <Option value="walk-in">Walk-in</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default GeneralField;
