import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ADD = "ADD";
const EDIT = "EDIT";

const PatientForm = (props) => {
  const { mode = ADD } = props;

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {}, []);

  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const apiUrl = `${base_apiUrl}/addPatient`;

        // Construct the nested object as required by the server
        const formData = {
          ...values,
          address: {
            street: values.address?.street,
            city: values.address?.city,
            state: values.address?.state,
            postalCode: values.address?.postalCode,
            country: values.address?.country,
          },
          nextOfKin: {
            firstName: values.nextOfKin?.firstName,
            lastName: values.nextOfKin?.lastName,
            relationship: values.nextOfKin?.relationship,
            contactNumber: values.nextOfKin?.contactNumber,
          },
        };

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(formData), // Stringify the object before sending
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

  // Function to convert data URL to File

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
                children: (
                  <GeneralField
                    uploadedImg={uploadedImg}
                    uploadLoading={uploadLoading}
                    handleOnclick={onFinish}
                  />
                ),
              },
            ]}
          />
          <div className="text-right mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={submitLoading}
              onClick={onFinish}
            >
              {mode === ADD ? "Create Patient" : "Save Changes"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default PatientForm;
