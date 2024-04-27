import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, Radio, message } from "antd";
import NurseReading from "./NursesReadings";
import LabRequest from "./Lab";
import LabResults from "./LabResults";
import RadilogyRequest from "./Radiology";
const { TextArea } = Input;
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ClinicalExamination = (data) => {
  const appointment_id = data.appointment_id;
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const [labRequestNeeded, setLabRequestNeeded] = useState(false);
  const [showLabRequestForm, setShowLabRequestForm] = useState(false);
  const [showRadioRequestForm, setShowRadioRequestForm] = useState(false);
  const [form] = Form.useForm();

  // Handle lab request change
  const sendRequest = async () => {
    const setSubmitLoading = (loading) => {
      console.log("loading", loading);
    };
    try {
      const values = await form.validateFields();
      const user_id = localStorage.getItem("user_id");
      const formData = { ...values, appointment_id, user_id };
      const apiUrl = `${base_apiUrl}/addLabRequest`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        setSubmitLoading(false);
        message.success(data.message);
        form.resetFields();

        setShowLabRequestForm(true);
        setLabRequestNeeded(false);
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      setSubmitLoading(false);
      message.error("Failed to submit the form. Please try again.");
    }
  };
  const handleLabRequestChange = (value) => {
    // Update the state based on the radio button selection
    setLabRequestNeeded(value === true);
  };
  const handleRadioRequestChange = (value) => {
    // Update the state based on the radio button selection
    setShowRadioRequestForm(value === true);
  };
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/appointment/${appointment_id}`
        );
        const data = await response.json();
        setAppointmentRecords(data.appointment);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointmentData();
  }, [appointment_id]);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={14}>
        <Card title="Patient Details">
          {appointmentRecords?.patient ? (
            // Access nested properties correctly
            <>
              <p>
                <strong>Appointment ID:</strong>{" "}
                {`${appointmentRecords.appointment_id}`}
              </p>
              <p>
                <strong>Patient Name:</strong>{" "}
                {`${appointmentRecords.patient.firstName} ${appointmentRecords.patient.lastName}`}
              </p>
              <p>
                <strong>Patient ID:</strong>{" "}
                {appointmentRecords.patient.patient_id}
              </p>
              <p>
                <strong>Patient Age:</strong>{" "}
                {appointmentRecords.patient.age}
              </p>
              {/* Add more patient details as needed */}
            </>
          ) : (
            <p>No patient details available</p>
          )}
        </Card>
        <Card title="Clinical Examination">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Examination"
                name={["examination", "clinical_examination"]}
              >
                <TextArea rows={6} placeholder="Examination" type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="General Examination"
                name={["examination", "general_examination"]}
              >
                <TextArea
                  rows={6}
                  placeholder="General Examination"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Systemic Examination"
                name={["examination", "systemic_examination"]}
              >
                <TextArea
                  rows={6}
                  placeholder="Systemic Examination"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={8}>
        {/* Card for Lab Request */}
        <Card className="align-items-center" title="Internal Investigation">
          <Radio.Group onChange={(e) => handleLabRequestChange(e.target.value)}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          {/* Conditionally render LabResults or LabRequest based on state */}
          {showLabRequestForm ? (
            <LabResults appointment_id={appointment_id} />
          ) : (
            labRequestNeeded && (
              <LabRequest
                sendRequest={sendRequest}
                form={form}
                setShowLabRequestForm={setShowLabRequestForm}
              />
            )
          )}
        </Card>
        <Card className="align-items-center" title="External Investigation">
          <Radio.Group
            onChange={(e) => handleRadioRequestChange(e.target.value)}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          {/* Conditionally render Radiology Request  based on state */}
          {showRadioRequestForm ? (
            <RadilogyRequest appointment_id={appointment_id} />
          ) : null}
        </Card>
        <Card title="Triage Results">
          <NurseReading appointment_id={appointment_id} />
        </Card>
      </Col>
    </Row>
  );
};

export default ClinicalExamination;
