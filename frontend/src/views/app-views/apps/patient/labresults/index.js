import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Row, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import LabRequest from "views/app-views/dashboards/doctor/Consultation/Lab";
import LabResults from "views/app-views/dashboards/doctor/Consultation/LabResults";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const Payment = (props) => {
  const appointmentId = useParams();
  const appointment_id = appointmentId.appointment_id;
  const [form] = Form.useForm();
  // const [submitLoading, setSubmitLoading] = useState(false);
  // const [paymentId, setPaymentId] = useState(null); // Track payment ID
  // const [paymentSuccess, setPaymentSuccess] = useState(false);
  // const [paymentDetails, setPaymentdetails] = useState(null);
  useEffect(() => {}, []);

  // const onFinish = async () => {
  //   setSubmitLoading(true);
  //   form
  //     .validateFields()
  //     .then(async (values) => {
  //       //get user id from local storage
  //       const userId = localStorage.getItem("user_id");
  //       const apiUrl = `${base_apiUrl}/makepayments`;

  //       const requestData = {
  //         ...values,
  //         receivedBy: userId,
  //         appointment: appointment_id,
  //       };
  //       const requestOptions = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json", // Set appropriate content type
  //         },
  //         body: JSON.stringify(requestData), // Send data as JSON
  //       };

  //       try {
  //         const response = await fetch(apiUrl, requestOptions);
  //         const data = await response.json();
  //         // console.log(data);
  //         setSubmitLoading(false);
  //         message.success(data.message || "Payment submitted successfully");
  //         setPaymentId(data.payment._id); // Set payment ID
  //         setPaymentdetails(data.payment);
  //         setPaymentSuccess(true); // Set payment success to true
  //         form.resetFields();
  //       } catch (error) {
  //         setSubmitLoading(false);
  //         console.error("Error:", error);
  //         message.error("Failed to submit the form. Please try again.");
  //       }
  //     })
  //     .catch((info) => {
  //       setSubmitLoading(false);
  //       console.log("info", info);
  //       message.error("Please enter all required fields");
  //     });
  // };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-3">Input Lab results</h2>
            </Flex>
          </div>
        </PageHeaderAlt>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row gutter={16}>
          <div className="container">
            <LabResults appointment_id={appointment_id} />
          </div>
        </Row>
      </Form>
    </>
  );
};

export default Payment;
