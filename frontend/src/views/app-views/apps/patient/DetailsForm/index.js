import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs } from "antd";
import GeneralField from "./GeneralField";
import NextOfKin from "./NextOfKin";
import MedicalRecords from "./MedicalRecords";
import AppointmentRecords from "./AppointmentRecords";
import Flex from "components/shared-components/Flex";

const DetailsForm = (props) => {
  // const { patientId } = useParams();
  const patientId = props.param.id;
  const [patientData, setPatientData] = useState(null);

  // console.log(patientData.patient.firstName);

  useEffect(() => {
    // Fetch user details from the API endpoint using the patientId
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getPatient/${patientId}`
        );
        const data = await response.json();
        // console.log(data);
        // Assuming the API response contains patient details
        setPatientData(data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatientDetails();
  }, [patientId]);

  return (
    <>
      <PageHeaderAlt className="border-bottom" overlap>
        <div className="container">
          <Flex
            className="py-2"
            mobileFlex={false}
            justifyContent="space-between"
            alignItems="center"
          ></Flex>
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
              children: <GeneralField patientData={patientData} />,
            },
            {
              label: "Next of Kin Details",
              key: "2",
              children: <NextOfKin patientData={patientData} />,
            },
            {
              label: "Medical Records",
              key: "3",
              children: <MedicalRecords patientId={patientId} />,
            },
            {
              label: "Appointments",
              key: "4",
              children: <AppointmentRecords patientId={patientId} />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default DetailsForm;
