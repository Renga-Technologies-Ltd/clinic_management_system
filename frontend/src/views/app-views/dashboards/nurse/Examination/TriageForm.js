import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const TriageForm = (data) => {
  const appointment_id = data.appointment_id;
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBMI] = useState(null);
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

  console.log("patient", bmi);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };
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
        <Card title="Vital Signs">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="appointment_id"
                hidden
                initialValue={appointment_id}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Systolic Blood Pressure"
                name={["appointment", "bloodPressure", "systolic"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter systolic blood pressure",
                  },
                ]}
              >
                <Input placeholder="Systolic Blood Pressure" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="Diastolic Blood Pressure"
                name={["appointment", "bloodPressure", "diastolic"]}
                rules={[
                  {
                    required: true,
                    message: "Please enter diastolic blood pressure",
                  },
                ]}
              >
                <Input placeholder="Diastolic Blood Pressure" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="Heart Rate"
                name={["appointment", "heartRate"]}
                rules={[{ required: true, message: "Please enter heart rate" }]}
              >
                <Input placeholder="Heart Rate" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="Temperature"
                name={["appointment", "temperature"]}
                rules={[
                  { required: true, message: "Please enter temperature" },
                ]}
              >
                <Input placeholder="Temperature" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="Respiratory Rate"
                name={["appointment", "respiratoryRate"]}
                rules={[
                  { required: true, message: "Please enter respiratory rate" },
                ]}
              >
                <Input placeholder="Respiratory Rate" type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="Pain Level"
                name={["appointment", "painLevel"]}
                rules={[{ required: true, message: "Please enter pain level" }]}
              >
                <Input placeholder="Pain Level" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                label="SpO2"
                name={["appointment", "SpO2"]}
                rules={[{ required: true, message: "Please enter SpO2" }]}
              >
                <Input placeholder="SpO2" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8}>
                <Form.Item label="Weight" name={["appointment", "weight"]}>
                  <Input
                    placeholder="Weight"
                    type="number"
                    onChange={handleWeightChange}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item label="Height" name={["appointment", "height"]}>
                  <Input
                    placeholder="Height"
                    type="number"
                    onChange={handleHeightChange}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Form.Item
                  label="Patient BMI"
                  name={["appointment", "bmi"]}
                  // initialValue={bmi}
                >
                  {(weight / (height / 100) ** 2).toFixed(2) || 0}
                </Form.Item>
              </Col>
            </Row>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default TriageForm;
