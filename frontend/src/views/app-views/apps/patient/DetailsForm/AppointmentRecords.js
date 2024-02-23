import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Tag } from "antd";
import NumberFormat from "react-number-format";
import utils from "utils";

const AppointmentRecords = (props) => {
  const { patientId } = props;
  const [appointmentRecords, setAppointmentRecords] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getAppointments/${patientId}`
        );
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

  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/getUser/${userId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
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
      render: (bookedBy) => {
        const user = fetchUserDetails(bookedBy); // You should implement fetchUserDetails
        return user ? user.name : "Unknown User";
      },
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      sorter: (a, b) => utils.antdTableSorter(a, b, "doctor"),
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
        <Card title="Disclaimer">
          <p>Remember to save</p>
        </Card>
      </Col>
    </Row>
   
  );
};

export default AppointmentRecords;
