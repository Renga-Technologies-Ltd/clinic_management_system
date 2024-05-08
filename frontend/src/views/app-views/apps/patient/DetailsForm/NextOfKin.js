import React from "react";
import { Row, Col, Card, Form } from "antd";

const NextOfKin = (props) => {
  const { patientData } = props;
  const firstName = patientData?.patient?.nextOfKin?.firstName || "";
  const lastName = patientData?.patient?.nextOfKin?.lastName || "";
  const relationship = patientData?.patient?.nextOfKin?.relationship || "";
  const contactNumber = patientData?.patient?.nextOfKin?.relationship || "";

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="First Name" name={["nextOfKin", "firstName"]}>
                <span>{firstName}</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Last Name" name={["nextOfKin", "lastName"]}>
                <span>{lastName}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Relationship"
                name={["nextOfKin", "relationship"]}
              >
                <span>{relationship}</span>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Contact Number"
                name={["nextOfKin", "contactNumber"]}
              >
                <span>{contactNumber}</span>
              </Form.Item>
            </Col>
          </Row>
        </Card>
       
      </Col>
    </Row>
  );
};

export default NextOfKin;
