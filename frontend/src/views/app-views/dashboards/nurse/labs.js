import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Button, message } from "antd";
import moment from "moment";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import utils from "utils";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const LabRequest = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const navigate = useNavigate();
  const handleLab = (appointmentId) => {
    message.info("Attending to patient");
    navigate(`/app/apps/patient/handlelab/${appointmentId}`);
  };
  const tableColumns = [
    {
      title: "Appointment ID",
      dataIndex: "appointment.appointment_id",
      render: (_, record) => (
        <div>{record.appointment && record.appointment.appointment_id}</div>
      ),
    },

    {
      title: "Date",
      dataIndex: "appointmentTime",
      sorter: (a, b) => utils.antdTableSorter(a, b, "appointmentTime"),
      render: (appointmentTime) => (
        <span>{moment(appointmentTime).format("MMMM Do YYYY, h:mm")}</span>
      ),
    },
    {
      title: "Test Name",
      dataIndex: "labRequest",
      key: "labRequest",
      render: (labRequest) => (
        <span>
          {labRequest && labRequest.testType && `${labRequest.testType}`}
        </span>
      ),
    },

    {
      // title: "Payment Status",
      dataIndex: "paid",
      key: "paid",
      render: (paid, record) => (
        <>
          {paid ? (
            <Tag color="green">Paid</Tag>
          ) : (
            <Tag color="red">Not Paid</Tag>
          )}
        </>
      ),
    },
    {
      dataIndex: "labResults",
      render: (labResults, record) => (
        <>
          {labResults ? (
            <Tag color="green">Patient attended to</Tag>
          ) : (
            <Button onClick={() => handleLab(record._id)}>
              Attend to patient
            </Button>
          )}
        </>
      ),
    },
  ];
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/getLabRequest`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.labRequest);
        if (Array.isArray(data.labRequest)) {
          setAppointmentRecords(data.labRequest);
        } else {
          console.error("Invalid data structure:", data);
        }
        console.log(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Card title="Todays Lab request">
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={appointmentRecords}
        rowKey="id"
      />
    </Card>
  );
};

export default LabRequest;
