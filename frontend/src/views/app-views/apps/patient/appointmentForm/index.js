import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ADD = "Save";
// const EDIT = "EDIT";

const AppointmentForm = (props) => {
  const { mode = ADD, params } = props;
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const pyamentPage = (appointmentId) => {
    navigate(`/app/apps/patient/pay-appointment/${appointmentId}`);
  };
  useEffect(() => {}, []);
  const onFinish = async () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const apiUrl = `${base_apiUrl}/newAppointment`;
        // const formData = new FormData();
        const requestData = values; // No need for FormData
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set appropriate content type
          },
          body: JSON.stringify(requestData), // Send data as JSON
        };

        try {
          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          // console.log(data);
          setSubmitLoading(false);
          message.success(
            `Appointment created successfully, proceed to payment`
          );
          form.resetFields();
          const appointmentId = data.appointment._id;
          pyamentPage(appointmentId);
        } catch (error) {
          setSubmitLoading(false);
          console.error("Error:", error);
          message.error("Failed to submit the form. Please try again.");
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required fields");
      });
  };

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
              <h2 className="mb-3">
                {mode === "ADD" ? "New Appoinment" : `Edit Patient`}{" "}
              </h2>
              <div className="mb-3">
                {/*  */}
                <Button
                  type="primary"
                  onClick={() => form.validateFields().then(onFinish)}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Submit" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "Registration Details",
                key: "1",
                children: <GeneralField />,
              },
            ]}
          />
        </div>
      </Form>
    </>
  );
};

export default AppointmentForm;
