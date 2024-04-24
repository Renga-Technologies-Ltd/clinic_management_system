/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Table, Select, Input, Button, Tag } from "antd";
import moment from "moment";
import { SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import utils from "utils";
import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

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
const TodaysAppointments = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const apiUrl = `${base_apiUrl}/allAppointments`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          setAppointmentRecords(data.appointments);
        } else {
          // console.error("Invalid data structure:", data);
        }
        // console.log(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        // You can set an error state or show a notification to the user
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to run once on mount

  return (
    <Card title="Appointments">
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={appointmentRecords}
        rowKey="id"
      />
    </Card>
  );
};
const Appointments = () => {
  const navigate = useNavigate();
  const newAppointment = () => {
    navigate(`/app/apps/patient/add-appointment`);
  };
  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mobileFlex={false}
      >
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input placeholder="Search" prefix={<SearchOutlined />} />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              placeholder="Status"
            ></Select>
          </div>
        </Flex>
        <div>
          <Button
            onClick={newAppointment}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            New Appointment
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <TodaysAppointments />
      </div>
    </Card>
  );
};

export default Appointments;
