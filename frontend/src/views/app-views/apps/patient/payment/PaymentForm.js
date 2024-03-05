import React, { useState, useEffect } from "react";
import {
  // Input,
  Row,
  Col,
  Card,
  Form,
  // Upload,
  // message,
  Select,
  // DatePicker,
  // Button,
  // Space,
} from "antd";

import { useParams } from "react-router-dom";
import Input from "antd/es/input/Input";

const base_apiUrl = process.env.REACT_APP_BASE_URL;
const { Option } = Select;

const PaymentForm = (props) => {
  const appointmentId = useParams();

  const [appointment, setAppointment] = useState([]);

  // console.log(appointmentId.appointment_id);
  const appointment_id = appointmentId.appointment_id;

  useEffect(() => {
    fetchAppointments();
  }, []);

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

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Appointment Details">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Appointment Id" name="patient">
                <span>{appointment._id}</span>
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
              <Form.Item label="Payment Method" name="payment_method">
                <Select placeholder="Payment Method">
                  <Option value="cash">Cash</Option>
                  <Option value="mpesa">M-Pesa</Option>
                  <Option value="card">Card</Option>
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
