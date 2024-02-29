import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import NextOfKin from "./NextOfKin";
// import VariationField from './VariationField'
// import ShippingField from './ShippingField'
import ProductListData from "assets/data/product-list.data.json";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ADD = "ADD";
const EDIT = "EDIT";

const AppointmentForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();

  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {}, []);
  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const apiUrl = `${base_apiUrl}/addPatient`; // replace with your actual API endpoint
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const requestOptions = {
          method: "POST",
          body: formData,
        };

        // Make the API request
        try {
          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          console.log(data);

          setSubmitLoading(false);

          if (mode === ADD) {
            message.success(`Created ${values.firstName} in patients list`);
            form.resetFields(); // Clear the form after successful submission
          }
          if (mode === EDIT) {
            message.success(`Patient data saved`);
          }
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
                {mode === "ADD" ? "New Patient" : `Edit Patient`}{" "}
              </h2>
              <div className="mb-3">
                <Button className="mr-2">Discard</Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
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
                children: <GeneralField />,
              },
              {
                label: "Next of Kin",
                key: "2",
                children: <NextOfKin />,
              },
            ]}
          />
        </div>
      </Form>
    </>
  );
};

export default AppointmentForm;
