import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, Modal } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import History from "./History";
import Diagnosis from "./Diagnosis";
import ClinicalExamination from "./ClinicalExamination";
import Treatment from "./Treatment";
import DocumentTemplate from "../DocumentTemplate";
import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const EditConsultation = (props) => {
  const navigate = useNavigate();
  const appointment_id = useParams().appointment_id;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(null); // State to store fetched data
  const [obserId, setObservId] = useState(null); // State to store fetched data
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [doctorData, setRequestDataDoctor] = useState(null);
  const [patientData, setRequestDataPatient] = useState(null);
  const [appointmentRecords, setAppointmentRecords] = useState(null);

  const showModal = (postData, patient, doctor) => {
    setModalVisible(true);
    setRequestData(postData);
    setRequestDataDoctor(doctor);
    setRequestDataPatient(patient);
    console.log(postData); // Set the data received from the API to state
  };

  useEffect(() => {
    const api = `${base_apiUrl}/getApprecords/${appointment_id}`;
    const fetchData = async () => {
      try {
        const response = await fetch(api);
        if (response.ok) {
          const data = await response.json();
          // Set form data after fetching
          setFormData(data);
          // Populate form fields with fetched data
          form.setFieldsValue(data);
          setObservId(data.appointmentDetails.observations._id);
          // console.log("data id is");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error:", error);
        message.error("Failed to fetch data from the server.");
      }
    };
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/appointment/${appointment_id}`
        );
        const data = await response.json();
        setAppointmentRecords(data.appointment);
        //setLoading(false); // Mark loading as false after data is fetched
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointmentData();
    fetchData(); // Call the fetchData function when the component mounts
  }, []);

  const onFinish = async (values) => {
    try {
      const update_api = `${base_apiUrl}/updateObservations/${obserId}`;
      // Make PUT or PATCH request to update data on the server-side
      const response = await fetch(update_api, {
        method: "PUT", // or PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        setSubmitLoading(false);
        message.success(data.message);
        const { observations, patient, doctor } = data;
        // Optionally, update the local state with the updated data
        setFormData(data);
        console.log("new doctors patient", observations);
        showModal(observations, patient, doctor);
        // console.log(observations);
        // showModal(observations, patient, doctor);
        // goBack();
      } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      setSubmitLoading(true);
      console.error("Error:", error);
      message.error("Failed to submit the form. Please try again.");
    }
  };
  const [activeTab, setActiveTab] = useState("1");

  const goBack = () => {
    navigate(`/app/dashboards/doctor`);
  };

  const hideModal = () => {
    goBack();
    setModalVisible(false);
  };

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

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const nextTab = () => {
    const currentTabIndex = parseInt(activeTab);
    setActiveTab((currentTabIndex + 1).toString());
  };

  const prevTab = () => {
    const currentTabIndex = parseInt(activeTab);
    setActiveTab((currentTabIndex - 1).toString());
  };
  // console.log(formData);

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
              <h2 className="mb-3">Patient Examination</h2>
              <div className="mb-3">
                {activeTab !== "1" ? (
                  <Button type="" onClick={prevTab}>
                    Back
                  </Button>
                ) : null}

                <Button
                  type="primary"
                  onClick={nextTab}
                  htmlType="button"
                  disabled={activeTab === "4"} // Disable Next on last tab
                >
                  Next
                </Button>
                <Button
                  type="primary"
                  onClick={onFinish}
                  htmlType="submit"
                  loading={submitLoading}
                  disabled={activeTab !== "4"} // Disable Save on last tab
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
            activeKey={activeTab}
            style={{ marginTop: 30 }}
            onChange={handleTabChange}
            items={[
              {
                label: "Summary",
                key: "1",
                children: (
                  <History
                    appointment_id={appointment_id}
                    initialValues={formData} // Pass the initialValues here
                  />
                ),
              },
              {
                label: "History and Examination",
                key: "2",
                children: (
                  <ClinicalExamination
                    appointment_id={appointment_id}
                    initialValues={formData} // Pass the initialValues here
                  />
                ),
              },
              {
                label: "Diagnosis",
                key: "3",
                children: (
                  <Diagnosis
                    appointment_id={appointment_id}
                    initialValues={formData} // Pass the initialValues here
                  />
                ),
              },
              {
                label: "Treatment and Advice",
                key: "4",
                children: (
                  <Treatment
                    appointment_id={appointment_id}
                    initialValues={formData} // Pass the initialValues here
                  />
                ),
              },
            ]}
          />
        </div>
        <Modal
          title="Radiology Requests Summary"
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
            patientData={patientData}
            doctorData={doctorData}
            pagedata={appointmentRecords}
          />
        </Modal>
      </Form>
    </>
  );
};

export default EditConsultation;
