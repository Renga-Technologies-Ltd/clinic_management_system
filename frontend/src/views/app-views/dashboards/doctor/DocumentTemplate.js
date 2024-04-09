import React from "react";

import moment from "moment";
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
          {/* <strong>
              <h4>Treatment Plan:</h4>
            </strong>
            <p>
              {" "}
              <pre>{requestData.treatment.treatment_plan}</pre>
            </p>{" "}
            <br /> */}
          <strong>
            <h4>Prescription:</h4>
          </strong>
          <pre>
            <p>{requestData.treatment && requestData.treatment.prescription}</p>
          </pre>
          <strong>
            <hr></hr> <h4>Follow Up Advice:</h4>
          </strong>

          <pre>
            <p>
              {requestData.treatment && requestData.treatment.follow_up_advice}
            </p>
          </pre>

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
export default DocumentTemplate;
