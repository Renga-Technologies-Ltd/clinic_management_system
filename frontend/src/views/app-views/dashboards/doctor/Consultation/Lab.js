import React, { useState } from "react";
import { Input, Button, Col, Card, Form } from "antd";

// const base_apiUrl = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;
const LabRequest = ({ sendRequest, form, setShowLabResults }) => {
  // const appointment_id = data.appointment_id;
  const [submitLoading, setSubmitLoading] = useState(false);
  // 

  // const sendRequest = async () => {
  //   try {
  //     const values = await form.validateFields();
  //     const formData = { ...values, appointment_id };
  //     const apiUrl = `${base_apiUrl}/addLabRequest`;
  //     const requestOptions = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     };
  //     const response = await fetch(apiUrl, requestOptions);
  //     if (response.ok) {
  //       const data = await response.json();
  //       message.success(data.message);
  //       form.resetFields();
  //     } else {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //     message.error("Failed to submit the form. Please try again.");
  //   } finally {
  //     setSubmitLoading(false);
  //   }
  // };
  const handleFormFinish = (values) => {
    // Handle form finish if needed
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFormFinish}>
      <Card title="Request Details">
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Test Name"
            name={"testName"}
            rules={[
              {
                required: true,
                message: "What kind of test is required?",
              },
            ]}
          >
            <Input placeholder="Test type" type="text" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Test Description"
            name={"testDescription"}
            rules={[
              {
                required: true,
                message: "Describe the test to be done",
              },
            ]}
          >
            <TextArea
              placeholder="Describe the test to be done"
              type="number"
            ></TextArea>
          </Form.Item>
        </Col>
        <Button
          type="success"
          onClick={() => {
            sendRequest();
            // Do not update setShowLabResults here
          }}
          loading={submitLoading}
          htmlType="button"
        >
          Send Request
        </Button>
      </Card>
    </Form>
  );
};

export default LabRequest;
