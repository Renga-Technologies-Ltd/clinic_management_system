import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Row, Col, Button, Table, Tag } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";

import GoalWidget from "components/shared-components/GoalWidget";
import Card from "components/shared-components/Card";
import { useNavigate } from "react-router-dom";
import { BandwidthChartData } from "./DefaultDashboardData";

import utils from "utils";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(BandwidthChartData);

  const [latestTransactionData, setlatestTransactionData] = useState([]);
  const [todayAppCount, setTodayAppCount] = useState(0);
  const [allAppCount, setAppCount] = useState(0);
  const [totalPaid, setAmountPaidToday] = useState(0);
  const [registeredPatients, setRegisteredPatients] = useState(0);
  const [registeredPatientscount, setRegisteredPatientscount] = useState(0);
  const { direction } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const userRoles = userData?.roles || [];

  const isAdminOrDoctor =
    userRoles.includes("Admin") || userRoles.includes("Doctor");
  useEffect(() => {
    const todayStart = moment().startOf("day"); // Get the start of today
    const todayEnd = moment().endOf("day"); // Get the end of today
    const fetchAppointments = async () => {
      try {
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

          const numberOfAppointments = todayAppointments.length;
          setTodayAppCount(numberOfAppointments);
          console.log("Number of appointments:", numberOfAppointments);
          //count all appointments
          const allAppointments = data.appointments;
          setAppCount(allAppointments.length);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error.message);
        // You can set an error state or show a notification to the user
      }
    };
    const fetchAllPayments = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/allPayments`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const payments = data.payments;
        // Filter payments for today's date
        const todayPayments = payments.filter((payment) =>
          moment(payment.timeOfPayment).isBetween(todayStart, todayEnd)
        );
        setlatestTransactionData(todayPayments);
        console.log("Today's payments:", todayPayments);

        // Calculate total amount paid for today
        const totalAmountPaidToday = todayPayments.reduce(
          (total, payment) => total + payment.amount,
          0
        );
        setAmountPaidToday(totalAmountPaidToday);

        // console.log("Total amount paid today:", totalAmountPaidToday);
      } catch (error) {
        console.error("Error fetching payments:", error.message);
        // You can set an error state or show a notification to the user
      }
    };
    const fetchRegisteredPatients = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/allpatient`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const patients = data.patients;
        setRegisteredPatientscount(patients.length);
        console.log("Registered patients:", patients);
        const newPatients = patients.filter((patient) =>
          moment(patient.createdAt).isBetween(todayStart, todayEnd)
        );
        console.log("New patients today:", newPatients);
        setRegisteredPatients(newPatients);
      } catch (error) {}
    };
    fetchAppointments();
    fetchAllPayments();
    fetchRegisteredPatients();
  }, []);
  const tableColumns = [
    {
      title: "Payment ID",
      dataIndex: "receipt_id",
      key: "receipt_id",
    },
    {
      title: "Time",
      dataIndex: "timeOfPayment",
      sorter: (a, b) => utils.antdTableSorter(a, b, "timeOfPayment"),
      render: (timeOfPayment) => (
        <span>{moment(timeOfPayment).format("h:mm:ss a")}</span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Recieved by",
      dataIndex: "receivedBy",
      render: (receivedBy) => (
        <span>
          {receivedBy &&
            receivedBy.profile &&
            `${receivedBy.profile.firstName} ${receivedBy.profile.lastName}`}
        </span>
      ),
    },
  ];
  const tableColumns2 = [
    {
      title: "Patient ID",
      // dataIndex: "patient_id",
      render: (record) => (
        <>
          <Button onClick={() => viewDetails(record._id)}>
            {record.patient_id}
          </Button>
        </>
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "firstName",
      key: "name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          {record.firsName}
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
  ];
  const viewDetails = (row) => {
    // console.log(row); // Log the row object to the console
    navigate(`/app/apps/patient/patient-details/${row}`);
  };
  const AnnualStatisticData = [
    {
      title: "All Registered Patients",
      value: registeredPatientscount,
      status: registeredPatientscount > 0 ? 1 : -1,
      subtitle: `Registered in the system`,
    },
    {
      title: "Today's Sales",
      value: totalPaid,
      status: totalPaid > 0 ? 1 : -1,
      subtitle: `Sales made today`,
    },
  ];

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
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            {AnnualStatisticData.map((elm, i) => (
              <Col xs={24} sm={24} md={24} lg={24} xl={8} key={i}>
                <StatisticWidget
                  title={elm.title}
                  value={elm.value}
                  status={elm.status}
                  subtitle={elm.subtitle}
                />
              </Col>
            ))}
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="Appointment Statistics"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={"400px"}
                direction={direction}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <GoalWidget
            title=""
            value={allAppCount}
            subtitle="All Appointments "
            // extra={<Button type="primary">Learn More</Button>}
          />
          <GoalWidget
            title=""
            value={todayAppCount}
            subtitle="Todays Appointments"
            // extra={<Button type="primary">Learn More</Button>}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={7}>
          <Card title="New Patients">
            <div className="mt-3">
              <Table
                className="no-border-last"
                columns={tableColumns2}
                dataSource={registeredPatients}
                rowKey="id"
                pagination={false}
              />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions">
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={latestTransactionData}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DefaultDashboard;
