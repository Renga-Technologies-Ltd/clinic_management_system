import React, { useState, useEffect } from "react";
import { Tabs, Form, Button, message } from "antd";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams hook
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import GeneralField from "./GeneralField";
import Flex from "components/shared-components/Flex";
import DetailsForm from "../DetailsForm";

const base_apiUrl = process.env.REACT_APP_BASE_URL;
const EditPatient = (props) => {
  const { id } = useParams(); // Destructure id from useParams
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const patientId = id;
    const param = {
      id: patientId,
    };
    const fetchPatients = async () => {
      try {
        const apiUrl = `${base_apiUrl}/getPatient/${patientId}`;
        const response = await fetch(apiUrl);
        const { patient } = await response.json(); // Destructure patient from the response
        console.log("patient:", patient); // Log the patient object
        if (patient) {
          // Check if patient exists
          setFormData(patient); // Set the patient in an array
        } else {
          console.error("Patient not found");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, [id]);

  const onFinish = async (values) => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        const apiUrl = `${base_apiUrl}/updatePatient/`;

        // Construct the nested object as required by the server
        const formData = {
          ...values,
          patientId: id,
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
        console.log("form data", formData);
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
          setSubmitLoading(true);
          message.success(`Patient data updated`);
          navigate(`/app/apps/patient/patient-details/${id}`);
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
        onFinish={onFinish}
        // name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={formData} // Set initial form values with fetched data
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-3">{`Edit Patient`}</h2>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "Summary",
                key: "1",
                // children: (
                //   <DetailsForm
                //     patientId={id}
                //     initialValues={formData} // Pass the initialValues here
                //   />
                // ),
              },
              {
                label: "Edit Patient Details",
                key: "2",
                children: (
                  <GeneralField
                    patientId={id}
                    initialValues={formData} // Pass the initialValues here
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
              // onClick={onFinish}
            >
              {"Save Changes"}
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default EditPatient;
