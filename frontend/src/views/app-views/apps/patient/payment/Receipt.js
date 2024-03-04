// Receipt.js

import React from "react";
import { Card, Row, Col, Typography } from "antd";

const { Title, Text } = Typography;

const Receipt = () => {
  // Placeholder data (replace with actual payment data)
  const paymentData = {
    appointmentId: "123456",
    amount: 100,
    paymentMethod: "Cash",
    transactionId: "789012",
    paymentDate: new Date().toLocaleString(),
  };

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Receipt">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Title level={4}>Appointment ID</Title>
              <Text>{paymentData.appointmentId}</Text>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Title level={4}>Amount</Title>
              <Text>{`$${paymentData.amount}`}</Text>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Title level={4}>Payment Method</Title>
              <Text>{paymentData.paymentMethod}</Text>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Title level={4}>Transaction ID</Title>
              <Text>{paymentData.transactionId}</Text>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Title level={4}>Payment Date</Title>
              <Text>{paymentData.paymentDate}</Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default Receipt;
