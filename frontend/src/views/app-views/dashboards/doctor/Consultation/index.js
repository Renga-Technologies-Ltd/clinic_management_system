import React, { useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message, Modal } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import History from "./History";
import Diagnosis from "./Diagnosis";
import ClinicalExamination from "./ClinicalExamination";
import Treatment from "./Treatment";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Consultation = (props) => {
  const navigate = useNavigate();
  const appointment_id = useParams().appointment_id;
  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestData, setRequestData] = useState(null);
  const [doctorData, setRequestDataDoctor] = useState(null);
  const [patientData, setRequestDataPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const base_apiUrl = process.env.REACT_APP_BASE_URL;

  const showModal = (postData, patient, doctor) => {
    setModalVisible(true);
    setRequestData(postData);
    setRequestDataDoctor(doctor);
    setRequestDataPatient(patient);
    console.log(postData); // Set the data received from the API to state
  };

  const onFinish = async () => {
    setSubmitLoading(true);
    try {
      const values = await form.validateFields();
      // Include appointment_id in the form values
      const app_id = appointment_id;
      const formData = { ...values, app_id };
      // console.log(formData, appointment_id);

      const apiUrl = `${base_apiUrl}/addMedicalRecords`;
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
        const { newDoctorObservations, patient, doctor } = data;
        // setModalVisible(medicalRecordId);
        showModal(newDoctorObservations, patient, doctor);
        // console.log("medicalRecordId", newDoctorObservations);
        form.resetFields();
        // goBack();
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
              <h2 className="mb-3">Patient Examination</h2>
              <div className="mb-3">
                {activeTab !== "1" ? (
                  <Button type="" onClick={prevTab}>
                    Back
                  </Button>
                ) : null}

                {activeTab === "4" ? (
                  <>
                    <Button
                      type="primary"
                      onClick={() => onFinish()}
                      htmlType="submit"
                      loading={submitLoading}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="primary" onClick={nextTab}>
                      Next
                    </Button>
                  </>
                )}
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
                label: "History",
                key: "1",
                children: <History appointment_id={appointment_id} />,
              },
              {
                label: "Examination",
                key: "2",
                children: (
                  <ClinicalExamination appointment_id={appointment_id} />
                ),
              },
              {
                label: "Diagnosis",
                key: "3",
                children: <Diagnosis appointment_id={appointment_id} />,
              },
              {
                label: "Treatment and Advice",
                key: "4",
                children: <Treatment appointment_id={appointment_id} />,
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
          />
        </Modal>
      </Form>
    </>
  );
};
// Component to display the document template
const DocumentTemplate = ({ requestData, patientData, doctorData }) => {
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
              Appointment: {patientData.appointment_id}
            </h2>
            <p>Date and Time: {formatDate(requestData.createdAt)}</p>
            <hr></hr>
            <h3>Patient Details</h3>
            <p>Name: {patientData.name}</p>
            <p>Phone: {patientData.phoneNumber}</p>
            <p>Email: {patientData.emailAdress}</p>
            <p>DOB:{moment(patientData.dob).format("MMMM Do YYYY")}</p>

            <p>Gender: {patientData.gender}</p>
          </div>
          <hr></hr>
        </div>
        <h3>Details</h3>
        <div className="mt-3">
          <strong>
            <h4>Treatment Plan:</h4>
          </strong>
          <p>{requestData.treatment.treatment_plan}</p> <br />
          <strong>
            <h4>Prescription:</h4>
          </strong>
          <p>{requestData.treatment.prescription}</p>
          <br />
          <strong>
            <h4>Follow Up Advice:</h4>
          </strong>
          <p>{requestData.treatment.follow_up_advice}</p>
          <br />
          <hr />
        </div>
        Doctor's Name: {doctorData.name}
      </div>
    </div>
  );
};

export default Consultation;
