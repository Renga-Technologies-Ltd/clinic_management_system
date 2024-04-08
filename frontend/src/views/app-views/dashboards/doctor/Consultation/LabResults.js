import React, { useEffect, useState } from "react";
import { Input, Upload, Col, Card, Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;
const { TextArea } = Input;

const LabResults = (data) => {
  const id = data.appointment_id;
  const [form] = Form.useForm();
  const [labRequest, setLabRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/getLabResultsbyId/${id}`);
        const data = await response.json();
        setLabRequest(data.labResults); // Assuming there's only one lab result
      } catch (error) {
        console.error("Error fetching lab results:", error);
      }
    };
    fetchLabResults();
  }, [id]);


  const onFinish = async (values) => {
    try {
      const testType =
        labRequest && labRequest.labRequest && labRequest.labRequest.testType;
      const formData = { ...values, testType, id };
      console.log("Form data:", formData);

      const apiUrl = `${base_apiUrl}/addLabResults`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      // Make the API request
      const response = await fetch(apiUrl, requestOptions);
      console.log("Response:", response);
      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        form.resetFields();
        goBack();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to submit the form. Please try again.");
    }
  };
  const goBack = () => {
    navigate(`/app/dashboards/nurse`);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      // onFinish={onFinish}
      initialValues={
        labRequest && labRequest.labRequest ? labRequest.labRequest : {}
      } // Set initial values here
    >
      <Card title="Internal Investigation">
        <h5>Test Type:</h5>
        <p>
          <strong>
            {labRequest &&
              labRequest.labRequest &&
              labRequest.labRequest.testType}
          </strong>
        </p>
        <hr></hr>
        <h5>Description:</h5>
        <p>
          <strong>
            {labRequest &&
              labRequest.labRequest &&
              labRequest.labRequest.description}
          </strong>
        </p>
      </Card>
      <Card title="External Investigation">
        <Col xs={24} sm={24} md={24}>
          <Form.Item label="Describe" name={"description"}>
            <TextArea placeholder="Describe done test results" type="text" />
          </Form.Item>
          <Form.Item label="Test Results" name={"results"}>
            <TextArea placeholder="Describe done test results" type="text" />
          </Form.Item>
        </Col>
        <hr></hr>
        <Button
          type="primary"
          onClick={() => form.validateFields().then(onFinish)}
        >
          Submit
        </Button>
      </Card>
    </Form>
  );
};

export default LabResults;
