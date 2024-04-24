import React, { useState, useEffect } from "react";
import { Card, Table, Input, Tag, message, Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";

import utils from "utils";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const AppointmentList = () => {
  const [appointmentRecords, setList] = useState(null);
  // const [list, setList] = useState([]);
  const navigate = useNavigate();
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
  const attendTo = (row) => {
    console.log(row); // Log the row object to the console
    navigate(`/app/dashboards/doctor/consultation/${row}`);
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
      title: "Appointment Status",
      dataIndex: "appointmentStatus",
      sorter: (a, b) => utils.antdTableSorter(a, b, "appointmentStatus"),
      render: (text, record) => {
        const { doctorReadings, nurseReadings } = record;
        if (!doctorReadings && !nurseReadings) {
          return <Tag color="red">Not Attended To</Tag>;
        } else if (!nurseReadings && doctorReadings) {
          return <Tag color="blue">Triage not done</Tag>;
        } else if (doctorReadings) {
        } else if (nurseReadings && !doctorReadings) {
          return <Tag color="blue">Waiting for Doctor</Tag>;
        } else if (doctorReadings) {
          return <Tag color="green">Completed</Tag>;
        }
        return <Tag color="green">Completed</Tag>;
      },
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
        const response = await fetch(`${base_apiUrl}/Appointments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          setList(data.appointments);
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
  }, []);
  const onSearch = (e) => {
    const value = e.currentTarget.value.trim();
    setList(
      value === ""
        ? [...appointmentRecords]
        : utils.wildCardSearch(appointmentRecords, value)
    );
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Card title="All appointments">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mobileFlex={false}
      >
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div>
            <Button
              onClick={handleRefresh}
              // type="primary"
              icon={<ReloadOutlined />}
              block
            >
              Reload
            </Button>
          </div>
        </Flex>
      </Flex>
      <div className="table-responsive">
        <Table
          pagination={false}
          columns={tableColumns}
          dataSource={appointmentRecords}
          rowKey="id"
        />
      </div>
    </Card>
  );
};

export default AppointmentList;
