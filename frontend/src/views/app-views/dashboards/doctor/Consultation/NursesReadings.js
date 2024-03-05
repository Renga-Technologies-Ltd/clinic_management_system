import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const NurseReading = (data) => {
  const appointment_id = data.appointment_id;
  const [nurseReadings, setNurseReading] = useState(null);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/getNurseReadings/${appointment_id}`
        );
        const data = await response.json();
        setNurseReading(data.nurseReadings);
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
        {nurseReadings ? (
          // Access nested properties correctly
          <>
            <p>
              <strong>Appointment ID:</strong> {`${nurseReadings._id}`}
            </p>
            <p>
              <strong>Blood pressure:</strong>{" "}
              {`${nurseReadings.bloodPressure.systolic} / ${nurseReadings.bloodPressure.diastolic}`}
            </p>
            <p>
              <strong>Heart rate:</strong> {nurseReadings.heartRate}
            </p>
            <p>
              <strong>Temperature:</strong> {nurseReadings.temperature}
            </p>
            <p>
              <strong>Respiratory Rate:</strong> {nurseReadings.respiratoryRate}
            </p>
            <p>
              <strong>Height:</strong> {nurseReadings.height}
            </p>
            <p>
              <strong>Weight:</strong> {nurseReadings.weight}
            </p>
            <p>
              <strong>Pulse Oximetry:</strong> {nurseReadings.pulseOximetry}
            </p>
            <p>
              <strong>Pain Level:</strong> {nurseReadings.painLevel}
            </p>
            {/* Add more patient details as needed */}
          </>
        ) : (
          <p>No patient details available</p>
        )}
      </Col>
    </Row>
  );
};

export default NurseReading;
