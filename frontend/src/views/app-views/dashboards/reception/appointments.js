import React, { useState, useEffect } from "react";
import { Card, Table, Tag, Button, Modal } from "antd";
import moment from "moment";
import { ReloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import utils from "utils";

import ReceiptTemplate from "./ReceiptTemplate";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

const TodaysAppointments = () => {
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  // const [paymentId, setPaymentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const navigate = useNavigate();
  const handlePayment = (appointmentId) => {
    navigate(`/app/apps/patient/pay-appointment/${appointmentId}`);
  };
  // const newAppointment = () => {};
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
        } else if (nurseReadings && !doctorReadings) {
          return <Tag color="blue">Waiting for Doctor</Tag>;
        } else if (doctorReadings) {
          return <Tag color="green">Completed</Tag>;
        }
        return null;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paid",
      key: "paid",
      render: (paid, record) => (
        <>
          {paid ? (
            <>
              <Tag color="green">Paid</Tag>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => openPrint(record._id)}
              >
                Reprint Receipt
              </Button>
            </>
          ) : (
            <Button onClick={() => handlePayment(record._id)}>Pay Now</Button>
          )}
        </>
      ),
    },
  ];
  const openPrint = async (id) => {
    try {
      const response = await fetch(
        `${base_apiUrl}/getPaymentbyAppointment/${id}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setReceiptData(data);
      // setPaymentId(data._id);
      setModalVisible(true); // Update modal visibility state
      console.log("Modal visible:", modalVisible); // Log modal visibility state
      console.log("data", data);
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      // You can set an error state or show a notification to the user
    }
  };

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

  return (
    <Card title="Upcoming Appointments">
      <Table
        pagination={false}
        columns={tableColumns}
        dataSource={appointmentRecords}
        rowKey="id"
      />
      {/* Modal to display Invoice component */}
      <Modal
        title="Invoice"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <ReceiptTemplate receiptData={receiptData} />
      </Modal>
    </Card>
  );
};

export default TodaysAppointments;
