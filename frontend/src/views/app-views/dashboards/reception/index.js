import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag} from "antd";
import moment from "moment";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
// import DonutChartWidget from "components/shared-components/DonutChartWidget";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import {
  OrderedListOutlined,
  ReconciliationOutlined,
  UserAddOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

import utils from "utils";

const DisplayButtons = () => (
  <Row gutter={16}>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <Link to="/app/apps/patient/add-patient">
        <DataDisplayWidget
          icon={<UserAddOutlined />}
          title="New Patient"
          color="cyan"
          vertical={true}
          avatarSize={55}
        />
      </Link>
      <Link to="/app/apps/patient/appointments">
        <DataDisplayWidget
          icon={<BarChartOutlined />}
          title="Book an Appointment"
          color="gold"
          vertical={true}
          avatarSize={55}
        />
      </Link>
    </Col>
    <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
      <Link to="/app/apps/patient/patient-list">
        <DataDisplayWidget
          icon={<OrderedListOutlined />}
          title="Patients List"
          color="blue"
          vertical={true}
          avatarSize={55}
        />
      </Link>
      <Link to="/billing-page">
        <DataDisplayWidget
          icon={<ReconciliationOutlined />}
          title="Bills and Payments"
          color="volcano"
          vertical={true}
          avatarSize={55}
        />
      </Link>
    </Col>
  </Row>
);
const tableColumns = [
  {
    title: "Appointment ID",
    dataIndex: "_id",
    render: (_, record) => (
      <div>
        <NumberFormat displayType={"text"} value={record._id} />
      </div>
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
    // render: (bookedBy) => {
    //   const user = fetchUserDetails(bookedBy); // You should implement fetchUserDetails
    //   return user ? user.name : "Unknown User";
    // },
  },
  {
    title: "Doctor",
    dataIndex: "doctor",
    sorter: (a, b) => utils.antdTableSorter(a, b, "doctor"),
  },
];
const TodaysAppointments = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/allAppointments`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          setAppointmentRecords(data.appointments);
        } else {
          console.error("Invalid data structure:", data);
        }
        console.log(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        // You can set an error state or show a notification to the user
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to run once on mount

  return (
    <Card title="Upcoming Appointments">
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={appointmentRecords}
        rowKey="id"
      />
    </Card>
  );
};
const ReceptionDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
          <DisplayButtons />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <TodaysAppointments />
        </Col>
      </Row>
    </>
  );
};

export default ReceptionDashboard;
