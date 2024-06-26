import React, { useState, useEffect } from "react";
import { Col } from "antd";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const NurseReading = (data) => {
  const appointment_id = data.appointment_id;
  const [nurseReadings, setNurseReading] = useState(null);
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/getNurseReadings/${appointment_id}`
        );
        const data = await response.json();
        setNurseReading(data.nurseReadings);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchAppointmentData();
  }, [appointment_id]);
  //   console.log(appointmentRecords);
  //   console.log(appointment_id);
  return (
    <Col xs={24} sm={24} md={17}>
      <>
        <p>
          <strong>Height:</strong> {nurseReadings?.height} cm
        </p>
        <p>
          <strong>Weight:</strong> {nurseReadings?.weight} kg
        </p>
      </>
      <hr></hr>
      <p>
        <strong>Patient BMI: </strong>{" "}
        {nurseReadings &&
          (
            nurseReadings.weight /
            ((nurseReadings.height / 100) * (nurseReadings.height / 100))
          ).toFixed(2)}
      </p>
      {(() => {
        const bmi =
          nurseReadings &&
          nurseReadings.weight /
            ((nurseReadings.height / 100) * (nurseReadings.height / 100));
        let bmiCategory = "";
        if (bmi < 18.5) {
          bmiCategory = "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
          bmiCategory = "Normal weight";
        } else if (bmi >= 25 && bmi < 30) {
          bmiCategory = "Overweight";
        } else {
          bmiCategory = "Obese";
        }
        let color = "";
        switch (bmiCategory) {
          case "Underweight":
            color = "#FF6347"; // Red
            break;
          case "Normal weight":
            color = "#32CD32"; // Green
            break;
          case "Overweight":
            color = "#FFA500"; // Orange
            break;
          case "Obese":
            color = "#FF4500"; // Dark Orange
            break;
          default:
            color = "black";
        }
        return <p style={{ color }}>{bmiCategory}</p>;
      })()}
      <hr></hr>
      {nurseReadings ? (
        // Check if tests array is present
        nurseReadings.tests && nurseReadings.tests.length > 0 ? (
          nurseReadings.tests.map((test, index) => (
            <>
              <div key={index}>
                <p>
                  <strong>Test {index + 1}:</strong>
                </p>
                <p>
                  <strong>Blood pressure:</strong>{" "}
                  {`${test.systolic} / ${test.diastolic}`}
                </p>
                <p>
                  <strong>Heart Rate:</strong> {test.heartRate}
                </p>
                <p>
                  <strong>Temperature:</strong> {test.temperature}
                </p>
                <p>
                  <strong>Respiratory Rate:</strong> {test.respiratoryRate}
                </p>
                <p>
                  <strong>Pain Level:</strong> {test.painLevel}
                </p>
                <p>
                  <strong>SpO2:</strong> {test.SpO2}
                </p>
                <hr></hr>
              </div>
            </>
          ))
        ) : (
          // Display nurse readings if tests array is not present
          <>
            <p>Displaying old data</p>
            {/* {nurseReadings} */}
            <p>
              <strong>Blood pressure:</strong>{" "}
              {`${nurseReadings?.bloodPressure?.systolic} / ${nurseReadings?.bloodPressure?.diastolic}`}
            </p>
            <p>
              <strong>Heart rate:</strong> {nurseReadings.heartRate}
            </p>
            <p>
              <strong>Temperature:</strong> {nurseReadings.temperature}
            </p>
            <p>
              <strong>Respiratory Rate:</strong> {nurseReadings.respiratoryRate}
            </p>

            <p>
              <strong>SpO2:</strong> {nurseReadings.SpO2}
            </p>
            <p>
              <strong>Pain Level:</strong> {nurseReadings.painLevel}
            </p>
            <p>
              <hr></hr>
            </p>
          </>
        )
      ) : (
        <p>Triage Data not available</p>
      )}
    </Col>
  );
};

export default NurseReading;
