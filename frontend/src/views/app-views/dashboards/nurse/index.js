import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Menu } from "antd";
import moment from "moment";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { OrderedListOutlined, EyeOutlined } from "@ant-design/icons";
import utils from "utils";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useNavigate } from "react-router-dom";

const DisplayButtons = () => (
  <Row gutter={16}>
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
    </Col>
  </Row>
);

const TodaysAppointments = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const navigate = useNavigate();
  const viewDetails = (row) => {
    console.log(row); // Log the row object to the console
    navigate(`/app/apps/patient/patient-details/${row}`);
  };
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row._id)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
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
      title: "Doctor",
      dataIndex: "doctor",
      sorter: (a, b) => utils.antdTableSorter(a, b, "doctor"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(record)} />
        </div>
      ),
    },
  ];

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
const NurseDashboard = () => {
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

export default NurseDashboard;
