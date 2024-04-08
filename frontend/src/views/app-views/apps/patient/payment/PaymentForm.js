import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Select } from "antd";
import { useParams } from "react-router-dom";
import Input from "antd/es/input/Input";

const base_apiUrl = process.env.REACT_APP_BASE_URL;
const { Option } = Select;

const PaymentForm = (props) => {
  const appointmentId = useParams();
  const [appointment, setAppointment] = useState([]);

  // console.log(appointmentId.appointment_id);

  useEffect(() => {
    const appointment_id = appointmentId.appointment_id;
    const fetchAppointments = async () => {
      try {
        // setLoading(true);
        const response = await fetch(
          `${base_apiUrl}/appointment/${appointment_id}`
        );
        const data = await response.json();
        // console.log(data.appointment);
        const appointment = data.appointment;
        setAppointment(appointment);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Appointment Details">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Appointment Id" name="patient">
                <span>{appointment.appointment_id}</span>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="Payment Details">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Amount" name="amount">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Payment Method" name="paymentMethod">
                <Select placeholder="Payment Method">
                  <Option value="Cash">Cash</Option>
                  <Option value="M-pesa">M-Pesa</Option>
                  <Option value="Card">Card</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Payment type" name="paymentType">
                <Select placeholder="Select payment type">
                  <Option value="First Time">Consultation</Option>
                  <Option value="Follow Up">Follow up with 7 days</Option>
                  <Option value="Lab">Lab payments</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentForm;
