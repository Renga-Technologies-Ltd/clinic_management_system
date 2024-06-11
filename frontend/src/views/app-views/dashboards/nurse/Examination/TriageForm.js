import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form, Button, message } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

const TriageForm = ({ form, appointment_id }) => {
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

  const handleWeightChange = (e) => {
    const newWeight = e.target.value;
    setWeight(newWeight);
    setBMI(calculateBMI(newWeight, height));
    form.setFieldsValue({
      appointment: {
        bmi: calculateBMI(newWeight, height),
      },
    });
  };

  const handleHeightChange = (e) => {
    const newHeight = e.target.value;
    setHeight(newHeight);
    setBMI(calculateBMI(weight, newHeight));
    form.setFieldsValue({
      appointment: {
        bmi: calculateBMI(weight, newHeight),
      },
    });
  };

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      return (weight / (height / 100) ** 2).toFixed(2);
    }
    return "0";
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Patient Details">
          {appointmentRecords?.patient ? (
            <>
              <p>
                <strong>Appointment ID:</strong>{" "}
                {appointmentRecords.appointment_id}
              </p>
              <p>
                <strong>Patient Name:</strong>{" "}
                {appointmentRecords.patient.firstName}{" "}
                {appointmentRecords.patient.lastName}
              </p>
              <p>
                <strong>Patient ID:</strong>{" "}
                {appointmentRecords.patient.patient_id}
              </p>
              <p>
                <strong>Patient Age:</strong>{" "}
                {appointmentRecords.patient.age || "NA"}
              </p>
            </>
          ) : (
            <p>No patient details available</p>
          )}
        </Card>
        <Card title="Vital Signs">
          {/* <Form form={form} name="dynamic_tests"> */}
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8}>
              <Form.Item
                name="appointment_id"
                hidden
                initialValue={appointment_id}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Weight" name={["appointment", "weight"]}>
                <Input
                  placeholder="Weight"
                  type="number"
                  onChange={handleWeightChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Height (cm)" name={["appointment", "height"]}>
                <Input
                  placeholder="Height"
                  type="number"
                  onChange={handleHeightChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Form.Item label="Patient BMI" name={["appointment", "bmi"]}>
                <Input value={bmi} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <br />
          <hr />
          <Form.List name="tests">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "systolic"]}
                          fieldKey={[fieldKey, "systolic"]}
                          label="Systolic Blood Pressure"
                          rules={[
                            {
                              required: true,
                              message: "Please enter systolic blood pressure",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Systolic Blood Pressure"
                            type="number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "diastolic"]}
                          fieldKey={[fieldKey, "diastolic"]}
                          label="Diastolic Blood Pressure"
                          rules={[
                            {
                              required: true,
                              message: "Please enter diastolic blood pressure",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Diastolic Blood Pressure"
                            type="number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "heartRate"]}
                          fieldKey={[fieldKey, "heartRate"]}
                          label="Heart Rate"
                          rules={[
                            {
                              required: true,
                              message: "Please enter heart rate",
                            },
                          ]}
                        >
                          <Input placeholder="Heart Rate" type="number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <br />
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "temperature"]}
                          fieldKey={[fieldKey, "temperature"]}
                          label="Temperature"
                          rules={[
                            {
                              required: true,
                              message: "Please enter temperature",
                            },
                          ]}
                        >
                          <Input placeholder="Temperature" type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "respiratoryRate"]}
                          fieldKey={[fieldKey, "respiratoryRate"]}
                          label="Respiratory Rate"
                          rules={[
                            {
                              required: true,
                              message: "Please enter respiratory rate",
                            },
                          ]}
                        >
                          <Input placeholder="Respiratory Rate" type="number" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "painLevel"]}
                          fieldKey={[fieldKey, "painLevel"]}
                          label="Pain Level"
                          rules={[
                            {
                              required: true,
                              message: "Please enter pain level",
                            },
                          ]}
                        >
                          <Input placeholder="Pain Level" type="number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <br />
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8}>
                        <Form.Item
                          {...restField}
                          name={[name, "SpO2"]}
                          fieldKey={[fieldKey, "SpO2"]}
                          label="SpO2"
                          rules={[
                            { required: true, message: "Please enter SpO2" },
                          ]}
                        >
                          <Input placeholder="SpO2" type="number" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <br />
                    {fields.length > 1 && (
                      <Button
                        type="danger"
                        onClick={() => remove(name)}
                        icon={<MinusCircleOutlined />}
                        style={{ marginBottom: "20px" }}
                      >
                        Remove Test
                      </Button>
                    )}
                    <hr />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  style={{ width: "100%" }}
                >
                  Add Test
                </Button>
              </>
            )}
          </Form.List>
          {/* </Form> */}
        </Card>
      </Col>
    </Row>
  );
};

export default TriageForm;
