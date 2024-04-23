import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, message } from "antd";
import NurseReading from "./NursesReadings";
// const { TextArea } = Input;
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const History = (data) => {
  const { appointment_id } = data;
  const [loading, setLoading] = useState(true); // State to track loading status
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  console.log(initialValues);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/appointment/${appointment_id}`
        );
        const data = await response.json();
        setAppointmentRecords(data.appointment);
        setLoading(false); // Mark loading as false after data is fetched
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const api = `${base_apiUrl}/getApprecords/${appointment_id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        if (response.ok) {
          const data = await response.json();
          const formValues = data.appointmentDetails.observations.history;
          setInitialValues(formValues);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to fetch data from the server.");
      }
    };
    fetchAppointmentData();
    fetchData();
  }, [appointment_id]);

  if (loading) {
    return <div>Loading...</div>; // Render a loading indicator while data is being fetched
  }
  // console.log(initialValues);
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
              {/* Add more patient details as needed */}
            </>
          ) : (
            <p>No patient details available</p>
          )}
        </Card>
        <Card title="Summary">
          <p>Proceed to next page to edit Patient history</p>
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
