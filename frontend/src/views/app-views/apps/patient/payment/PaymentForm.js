import React, { useState, useEffect } from "react";
import {
  Input,
  Row,
  Col,
  Card,
  Form,
  Upload,
  message,
  Select,
  DatePicker,
  Button,
  Space,
} from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const base_apiUrl = process.env.REACT_APP_BASE_URL;
const { Option } = Select;

const PaymentForm = (props) => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      // setLoading(true);
      const response = await fetch(
        `${base_apiUrl}/appointment/${appointmentId}`
      );
      const data = await response.json();
      setAppointment(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Appointment Details"></Card>
        <Card title="Accompanied by"></Card>
        <Card title="Appointment Details"></Card>
      </Col>
    </Row>
  );
};

export default PaymentForm;
