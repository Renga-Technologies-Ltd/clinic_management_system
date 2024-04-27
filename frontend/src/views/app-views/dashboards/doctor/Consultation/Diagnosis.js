import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";
import NurseReading from "./NursesReadings";

const { TextArea } = Input;
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const Diagnosis = (data) => {
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
  //   console.log(appointmentRecords);
  //   console.log(appointment_id);
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
        <Card title="Diagnosis">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Provisional Diagnosis"
                name={["diagnosis", "provisional"]}
              >
                <TextArea
                  rows={6}
                  placeholder="Provisional Diagnosis"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Investigations Advice"
                name={["diagnosis", "investigations_advice"]}
              >
                <TextArea
                  rows={6}
                  placeholder="Investigations Advice"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Final Diagnosis"
                name={["diagnosis", "final_diagnosis"]}
              >
                <TextArea rows={6} placeholder="Final Diagnosis" type="text" />
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

export default Diagnosis;
