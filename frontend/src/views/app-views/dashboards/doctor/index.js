import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag, Button, message } from "antd";
import moment from "moment";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";

import { Link } from "react-router-dom";
import {
  OrderedListOutlined,
  d,
  UserAddOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import utils from "utils";

import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

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
      {/* <Link to="/billing-page">
        <DataDisplayWidget
          icon={<ReconciliationOutlined />}
          title="Bills and Payments"
          color="volcano"
          vertical={true}
          avatarSize={55}
        />
      </Link> */}
    </Col>
  </Row>
);

const TodaysAppointments = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const navigate = useNavigate();
  const attendTo = (row) => {
    console.log(row); // Log the row object to the console
    navigate(`/app/dashboards/doctor/consultation/${row}`);
  };
  const viewDetails = (row) => {
    console.log(row); // Log the row object to the console
    message.info("Viewing details for appointment ID: " + row);
    navigate(`/app/dashboards/doctor/viewconsultation/${row}`);
  };
  const editDetails = (row) => {
    console.log(row);
    message.info("Viewing details for appointment ID: " + row);
    navigate(`/app/dashboards/doctor/editconsultation/${row}`);
  };

  const tableColumns = [
    {
      title: "Appointment ID",
      dataIndex: "appointment_id",
      render: (_, record) => <div>{record.appointment_id}</div>,
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
      title: "Appointment Status",
      dataIndex: "appointmentStatus",
      sorter: (a, b) => utils.antdTableSorter(a, b, "appointmentStatus"),
      render: (text, record) => {
        const { doctorReadings, nurseReadings } = record;

        if (!doctorReadings && !nurseReadings) {
          return <Tag color="red">Not Attended To</Tag>;
        } else if (nurseReadings && !doctorReadings) {
          return <Tag color="blue">Waiting for Doctor</Tag>;
        } else if (doctorReadings) {
          return <Tag color="green">Completed</Tag>;
        }

        return null;
      },
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
    {
      title: "Payment Status",
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
      title: "Actions",
      dataIndex: "appointmentStatus",
      sorter: (a, b) => utils.antdTableSorter(a, b, "appointmentStatus"),
      render: (text, record) => {
        const { doctorReadings } = record;
        if (!doctorReadings) {
          return (
            <>
              <Button onClick={() => attendTo(record._id)}>Attend to</Button>
            </>
          );
        } else {
          return (
            <>
              <Button onClick={() => viewDetails(record._id)}>View</Button>
              <Button onClick={() => editDetails(record._id)}>Edit</Button>
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const todayStart = moment().startOf("day"); // Get the start of today
        const todayEnd = moment().endOf("day"); // Get the end of today

        const response = await fetch(`${base_apiUrl}/Appointments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          // Filter appointments for today's date
          const todayAppointments = data.appointments.filter((appointment) =>
            moment(appointment.appointmentTime).isBetween(todayStart, todayEnd)
          );
          setAppointmentRecords(todayAppointments);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        // You can set an error state or show a notification to the user
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array to run once on mount

  // Empty dependency array to run once on mount

  return (
    <Card title="New Appointments">
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={appointmentRecords}
        rowKey="id"
      />
    </Card>
  );
};
const DoctorDash = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const userRoles = userData?.roles || [];

  const isAdminOrDoctor =
    userRoles.includes("Admin") || userRoles.includes("Doctor");

  if (!isAdminOrDoctor) {
    // Render welcome card and redirection links for non-Doctor and non-Admin users
    return (
      <div>
        <h1>Welcome!</h1>
        <p>You are not authorized to access this dashboard.</p>
        {userRoles.includes("Nurse") && (
          <Button onClick={() => navigate("/app/dashboards/nurse")}>
            Go to Nurse Dashboard
          </Button>
        )}
        {userRoles.includes("Reception") && (
          <Button onClick={() => navigate("/app/dashboards/reception")}>
            Go to Reception Dashboard
          </Button>
        )}
      </div>
    );
  }
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

export default DoctorDash;
