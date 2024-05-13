import React from "react";
import { Row, Col, Card } from "antd";

const Summary = ({ initialValues }) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Summary">
          <p>Edit patient information on the next tab</p>
        </Card>
      </Col>
    </Row>
  );
};

export default Summary;
