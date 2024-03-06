import React, { useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import TriageForm from "./TriageForm";
import { useNavigate } from "react-router-dom";

const Examination = (props) => {
  const navigate = useNavigate();
  const appointment_id = useParams().appointment_id;
  //   console.log(receipt_id);

  const [form] = Form.useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  const base_apiUrl = process.env.REACT_APP_BASE_URL;

  //   console.log(appointmentRecords);

  const onFinish = async () => {
    setSubmitLoading(true);
    try {
      const values = await form.validateFields();
      // Include appointment_id in the form values
      const formData = { ...values, appointment_id };
      // console.log(formData, appointment_id);

      const apiUrl = `${base_apiUrl}/nurseReadings`;

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
        setSubmitLoading(false);
        message.success(data.message);
        form.resetFields();
        goBack();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setSubmitLoading(false);
      console.error("Error:", error);
      message.error("Failed to submit the form. Please try again.");
    }
  };
  const goBack = () => {
    //console.log(row); // Log the row object to the console
    navigate(`/app/dashboards/nurse`);
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
              <h2 className="mb-3">New Patient Examination</h2>
              <div className="mb-3">
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  Save
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
                label: "General",
                key: "1",
                children: <TriageForm appointment_id={appointment_id} />,
              },
            ]}
          />
        </div>
      </Form>
    </>
  );
};

export default Examination;
