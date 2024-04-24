import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag } from "antd";
import NumberFormat from "react-number-format";
import utils from "utils";
import moment from "moment";
import { Link } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const AppointmentRecords = (props) => {
  const { patientId } = props;
  const [appointmentRecords, setAppointmentRecords] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiUrl = `${base_apiUrl}/getAppointments/${patientId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          setAppointmentRecords(data.appointments);
        } else {
          console.error("Invalid data structure:", data);
        }
        console.log(data.appointments);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchAppointments();
  }, [patientId]);

  const tableColumns = [
    {
      title: "Appointment ID",
      dataIndex: "appointment_id",
      render: (appointment_id, record) => (
        <a href={`/app/dashboards/doctor/viewconsultation/${record._id}`}>
          {appointment_id}
        </a>
      ),
    },

    {
      title: "Patient",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => (
        <span>
          {patient && patient && `${patient.firstName} ${patient.lastName}`}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "appointmentTime",
      sorter: (a, b) => utils.antdTableSorter(a, b, "appointmentTime"),
      render: (appointmentTime) => (
        <span>{moment(appointmentTime).format("MMMM Do YYYY, h:mm:ss a")}</span>
      ),
    },
    {
      title: "Appointment Type",
      dataIndex: "bookingType",
      key: "bookingType",
      render: (bookingType) => (
        <Tag color={bookingType === "scheduled" ? "green" : "blue"}>
          {bookingType}
        </Tag>
      ),
    },
    {
      title: "Booked By",
      dataIndex: "bookedBy",
      key: "bookedBy",
      render: (bookedBy) => (
        <span>
          {bookedBy &&
            bookedBy.profile &&
            `${bookedBy.profile.firstName} ${bookedBy.profile.lastName}`}
        </span>
      ),
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      sorter: (a, b) => utils.antdTableSorter(a, b, "doctor"),
      render: (doctor) => (
        <span>
          {doctor &&
            doctor.profile &&
            `${doctor.profile.firstName} ${doctor.profile.lastName}`}
        </span>
      ),
    },
  ];
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Appointment Records">
          <div className="table-responsive">
            <Table
              columns={tableColumns}
              dataSource={appointmentRecords}
              rowKey="_id"
            />
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default AppointmentRecords;
