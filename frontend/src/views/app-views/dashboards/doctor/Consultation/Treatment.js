import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";
import NurseReading from "./NursesReadings";
import moment from "moment";
const { TextArea } = Input;
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const Treatment = (data) => {
  const appointment_id = data.appointment_id;
  const [appointmentRecords, setAppointmentRecords] = useState(null);
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
      <Col xs={24} sm={24} md={17}>
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
                <strong>Patient Age:</strong> {appointmentRecords.patient.age}
              </p>
              {/* Add more patient details as needed */}
            </>
          ) : (
            <p>No patient details available</p>
          )}
        </Card>
        <Card title="Treatment">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Treatment Plan"
                name={["treatment", "treatment_plan"]}
              >
                <TextArea rows={6} placeholder="Treatment Plan" type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Prescription"
                name={["treatment", "prescription"]}
              >
                <TextArea rows={6} placeholder="Prescription" type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Follow Up Advice"
                name={["treatment", "follow_up_advice"]}
              >
                <TextArea rows={6} placeholder="Follow Up Advice" type="text" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Triage Results">
          <NurseReading appointment_id={appointment_id} />
        </Card>
      </Col>
    </Row>
  );
};

export default Treatment;
