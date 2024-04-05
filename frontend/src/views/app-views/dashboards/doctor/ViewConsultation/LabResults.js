import React, { useState, useEffect } from "react";
import { Input, Row, Col, Card, Form } from "antd";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

const LabResults = (data) => {
  const appointment_id = data.appointment_id;

  const [labRequest, setLabRequest] = useState(null);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/getLabResults/${appointment_id}`        );
        const data = await response.json();
        setLabRequest(data.labResults);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointmentData();
  }, [appointment_id]);
  // console.log(nurseReadings);

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        {labRequest ? (
          // Access nested properties correctly
          <>
            {labRequest.map((request, index) => (
              <div key={index}>
                <p>
                  <strong>Test Type:</strong>{" "}
                  {request.labResults?.testType || "Not Available"}
                </p>
                <hr></hr>
                <p>
                  <strong>Test Results:</strong>{" "}
                  {request.labResults?.results || "Not Available"}
                </p>
                <hr></hr>
                <p>
                  <strong>Description:</strong>{" "}
                  {request.labResults?.description || "Not Available"}
                </p>
                <hr></hr>
              </div>
            ))}
          </>
        ) : (
          <p>Lab Data not available</p>
        )}
      </Col>
    </Row>
  );
};

export default LabResults;
