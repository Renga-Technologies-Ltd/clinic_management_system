import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const RadiologyResults = (data) => {
  const appointment_id = data.appointment_id;

  const [radiologyResults, setRadiologyResults] = useState(null);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/radiology/${appointment_id}`
        );
        const data = await response.json();
        setRadiologyResults(data.radiologyRecords[0]);
        // console.log(data.radiologyRecord);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointmentData();
  }, [appointment_id]);
  // console.log(radiologyResults);
  //   console.log(appointment_id);
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        {radiologyResults ? (
          // Access nested properties correctly
          <>
            <p>
              <strong>Test Description</strong>{" "}
            </p>
            {`${radiologyResults.description}`}
          </>
        ) : (
          <p>Radiology Data not available</p>
        )}
      </Col>
    </Row>
  );
};

export default RadiologyResults;
