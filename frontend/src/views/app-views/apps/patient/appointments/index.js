/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Table, Select, Input, Button, Tag } from "antd";
import moment from "moment";
import { FileExcelOutlined, SearchOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import utils from "utils";

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
const Appointments = () => {
  return (
    <Card>
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
              //   onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              //   onChange={handleShowStatus}
              placeholder="Status"
            >
              {/* <Option value="All">All payment </Option>
              {paymentStatusList.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))} */}
            </Select>
          </div>
        </Flex>
        <div>
          <Button type="primary" icon={<FileExcelOutlined />} block>
            Export All
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
