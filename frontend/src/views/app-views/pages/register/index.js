import React from "react";
import { Card, Row, Col } from "antd";
import RegisterForm from "../../../auth-views/components/RegisterForm";

const AddUser = () => {
  return (
    <Card className="calendar mb-0">
      <Row>
        <Col xs={24} sm={24} md={9} lg={6}>
          <h2 className="mb-4">Add user</h2>
          <RegisterForm />
        </Col>
      </Row>
    </Card>
  );
};

export default AddUser;
