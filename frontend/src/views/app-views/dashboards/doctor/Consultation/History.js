import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";
import NurseReading from "./NursesReadings";
const { TextArea } = Input;
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const History = (data) => {
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
                <strong>Appointment ID:</strong> {`${appointmentRecords._id}`}
              </p>
              <p>
                <strong>Patient Name:</strong>{" "}
                {`${appointmentRecords.patient.firstName} ${appointmentRecords.patient.lastName}`}
              </p>
              <p>
                <strong>Patient ID:</strong> {appointmentRecords.patient._id}
              </p>
              {/* Add more patient details as needed */}
            </>
          ) : (
            <p>No patient details available</p>
          )}
        </Card>
        <Card title="History">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="History of present illness"
                name={["history", "present_illness"]}
              >
                <TextArea
                  rows={6}
                  placeholder="History of present illness"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="History of past illness"
                name={["history", "past_illness"]}
              >
                <TextArea
                  rows={6}
                  placeholder="History of past illness"
                  type="text"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Personal History"
                name={["history", "personal_history"]}
              >
                <TextArea rows={6} placeholder="Personal History" type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Menstrual History"
                name={["history", "menstraul_history"]}
              >
                <TextArea rows={6} placeholder="Menstral History" type="text" />
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

export default History;
