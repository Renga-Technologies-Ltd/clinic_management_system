import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Button, Col, Row, Card, message, Modal, Form } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import NurseReading from "../Consultation/NursesReadings";
import LabResults from "./LabResults";
import RadiologyResults from "./RadiologyResults";
// import { use } from "i18next";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ViewConsultation = (props) => {
  const navigate = useNavigate();
  // const [requestData, setRequestData] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [observations, setObservations] = useState(null);
  // const [nurseReadings, setNurseReadings] = useState(null);
  const [patient, setPatient] = useState(null);
  const appointment_id = useParams().appointment_id;
  // console.log(appointment_id);

  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    // Make the API request
    const apiUrl = `${base_apiUrl}/getApprecords/${appointment_id}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // console.log(data);
        const { appointment, observations, patient } = data.appointmentDetails;
        // Set appointment details
        setAppointment(appointment);
        // Set doctor observations
        setObservations(observations);
        // Set nurse readings
        // setNurseReadings(nurseReadings);
        // Set patient details
        setPatient(patient);

        // setModalVisible(medicalRecordId);
        // showModal(doctorObservations, patient, doctor);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        message.error("There was an error fetching data");
      });
  }, [appointment_id]);

  const goBack = () => {
    navigate(`/app/dashboards/doctor`);
  };
  const editDetails = (row) => {
    console.log(row);
    message.info("Editings details for appointment ID: " + row);
    navigate(`/app/dashboards/doctor/editconsultation/${row}`);
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

  return (
    <>
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
              <Button onClick={() => editDetails(appointment_id)}>Edit</Button>
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
                {/* <DocumentTemplate
                    formData={form.getFieldsValue()}
                    requestData={requestData}
                    patientData={patientData}
                    doctorData={doctorData}
                  /> */}
              </Modal>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>{" "}
      <div className="container"></div>
      <br></br>
      <br></br>
      <br></br>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={17}>
          <Card title="Basic Info">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="First Name">
                    <span>{observations?.patientName}</span>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item label="Date of Birth">
                    <span>
                      {moment(patient?.dateOfBirth).format("MMMM Do YYYY")}
                    </span>
                  </Form.Item>
                </Col>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Appointment Date">
                  <span>
                    {moment(observations?.createdAt).format(
                      "MMMM Do YYYY hh:mm a"
                    )}
                    {}
                  </span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Appointment " name="gender">
                  <span>{appointment?.appointment_id}</span>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Patient ID">
                  <span>{patient?.patient_id} </span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="Contact Number" name="contactNumber">
                  <span>{patient?.contactNumber}</span>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Medical Information">
            <Card title="History">
              <h5>Chief Complaint</h5>
              <p>
                {" "}
                <pre>{observations?.history?.chief_complaints}</pre>
              </p>
              <hr></hr>
              <h5>Present Illness</h5>
              <p>
                {" "}
                <pre>{observations?.history?.present_illness}</pre>
              </p>
              <hr></hr>
              <h5>Past Illness</h5>
              <span>
                <pre>{observations?.history?.past_illness}</pre>
              </span>
              <hr></hr>
              <h5>Family History</h5>
              <span>
                <pre>{observations?.history?.family_history}</pre>
              </span>
              <hr></hr>
              <h5>Personal History</h5>
              <span>
                <pre>{observations?.history?.personal_history}</pre>
              </span>
              <hr></hr>
            </Card>
            <Card title="Examination">
              <h5>Clinical Examination</h5>
              <span>
                <pre>{observations?.examination?.clinical_examination}</pre>
              </span>
              <hr></hr>
              <h5>General Examination</h5>
              <span>
                {" "}
                <pre>{observations?.examination?.general_examination}</pre>
              </span>

              <hr></hr>
              <h5>Systemic Examination</h5>
              <span>
                <pre> {observations?.examination?.systemic_examination}</pre>
              </span>
              <hr></hr>
            </Card>
            <Card title="Diagnosis">
              <h5>Provisional Diagnosis</h5>
              <span>
                <pre>{observations?.diagnosis?.provisional}</pre>
              </span>
              <hr></hr>
              <h5>Investigations Advice</h5>
              <span>
                <pre>{observations?.diagnosis?.investigations_advice}</pre>
              </span>

              <hr></hr>
              <h5>Final Diagnosis</h5>
              <span>
                <pre>{observations?.diagnosis?.final_diagnosis}</pre>
              </span>
              <hr></hr>
            </Card>
            <Card title="Treatment">
              <h5>Treatment Plan</h5>
              <span>
                <pre>{observations?.treatment?.treatment_plan}</pre>
              </span>
              <hr></hr>
              <h5>Prescription</h5>
              <span>
                <pre>{observations?.treatment?.prescription}</pre>
              </span>
              <hr></hr>
              <h5>Follow up Advice</h5>
              <span>
                <pre>{observations?.treatment?.follow_up_advice}</pre>
              </span>
              <hr></hr>
            </Card>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={7}>
          <Card title="Triage Results">
            <NurseReading appointment_id={appointment_id} />
          </Card>
          <Card title="Internal Investigation Results">
            <LabResults appointment_id={appointment_id} />
          </Card>
          <Card title="External Investigation">
            <RadiologyResults appointment_id={appointment_id} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

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
            <hr />
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <p>Name: {patientData.name}</p>
                <p>
                  DOB: {moment(patientData.dob).format("Do MMMM YYYY")},{" "}
                  {patientData.gender}
                </p>
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p>Phone: {patientData.phoneNumber}</p>
                <p>Email: {patientData.emailAdress}</p>
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
        <h3>Details</h3>
        <div className="mt-3">
          <strong>
            <h4>Treatment Plan:</h4>
          </strong>
          <p>
            {" "}
            <pre>{requestData.treatment.treatment_plan}</pre>
          </p>{" "}
          <br />
          <strong>
            <h4>Prescription:</h4>
          </strong>
          <p>
            <pre>{requestData.treatment.prescription}</pre>
          </p>
          <br />
          <strong>
            <h4>
              <pre>Follow Up Advice:</pre>
            </h4>
          </strong>
          <p>
            <pre>{requestData.treatment.follow_up_advice}</pre>
          </p>
          <br />
          <hr />
        </div>
        <div className="mt-3 text-right">
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              {doctorData.name}
              <p>Consultant Physician</p>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ width: "100%" }}>
                <img src="/img/signature.png" alt="Doctors Signature" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewConsultation;
