import React, { useState, useEffect } from "react";
import { Input, Col, Button, Form, message, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const { TextArea } = Input;

const RadilogyRequest = (data) => {
  const appointment_id = data.appointment_id;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState(null);

  const showModal = (postData) => {
    setModalVisible(true);
    setRequestData(postData); // Set the data received from the API to state
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const sendRequest = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    try {
      const values = await form.validateFields();
      // Include appointment_id in the form values
      const formData = { ...values, appointment_id };
      const apiUrl = `${base_apiUrl}/radiology`;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      // Make the API request
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        form.resetFields();
        setLoading(false);
        showModal(data.request); // Pass the data received from the API
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Failed to submit the form. Please try again.");
    }
  };

  useEffect(() => {
    console.log("requested data", requestData); // Log requestData after each render
  }, [requestData]); // Run the effect only when requestData changes

  // Function to print the document

  const printDocument = () => {
    const printableContent = document.querySelector(".printable-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Form form={form} layout="vertical" onFinish={sendRequest}>
      <Col xs={24} sm={24} md={24}>
        <hr />
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Test Description"
            name={"radiology_test"}
            rules={[
              {
                required: true,
                message: "Describe the test to be done",
              },
            ]}
          >
            <TextArea
              rows={6}
              placeholder="Instructions to radiologist"
              type="text"
            />
          </Form.Item>
        </Col>
        <Button type="primary" onClick={sendRequest} icon={<LoadingOutlined />}>
          Save Request and Print
        </Button>
      </Col>

      <Modal
        title="External Requests Summary"
        visible={modalVisible}
        onCancel={hideModal}
        footer={[
          <Button key="close" onClick={hideModal}>
            Close
          </Button>,
          <Button key="print" type="primary" onClick={printDocument}>
            Print
          </Button>,
        ]}
      >
        {/* Pass requestData as props to DocumentTemplate */}
        <DocumentTemplate
          formData={form.getFieldsValue()}
          requestData={requestData}
        />
      </Modal>
    </Form>
  );
};

// Component to display the document template
const DocumentTemplate = ({ requestData }) => {
  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", options);
  };
  return (
    <div>
      <div className="printable-content">
        <div className="d-md-flex justify-content-md-between">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo and Address */}
            <div style={{ width: "50%" }}>
              <img src="/img/logo.png" alt="" />
            </div>
            {/* Receipt Details */}
            <div style={{ width: "50%", textAlign: "right" }}>
              <p>
                <span className="font-weight-semibold text-dark font-size-md">
                  <strong>Mahapatra Medi-Care Limited</strong>
                </span>
                <br />
                <span>6th Floor; B Wing, Doctor's Park</span>
                <br />
                <span>3rd Parklands Avenue</span>
                <br />
                <span>P.O Box: 38158 -00628</span>
                <br />
                <span>Nairobi, Kenya</span>
                <br />
                <abbr className="text-dark" title="Phone">
                  Phone:
                </abbr>
                <span> (254)743349929</span>
              </p>
            </div>
          </div>
          <div className="mt-3 text-right">
            <h2 className="mb-1 font-weight-semibold">
              Document: {requestData.request_id}
            </h2>
            <p>Date Created: {formatDate(requestData.createdAt)}</p>
            <address>
              <p>
                <span className="font-weight-semibold text-dark font-size-md">
                  {" "}
                </span>
                <span>Test Details:</span> <br />
              </p>
            </address>
          </div>
        </div>
        <div className="mt-3">
          <hr />
          <p>Please perform the following tests:</p>
          <strong>{requestData.description}</strong>
          <br />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default RadilogyRequest;
