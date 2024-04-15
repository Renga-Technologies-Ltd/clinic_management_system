import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Row, Col, Button, Avatar, Dropdown, Table, Tag } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import ChartWidget from "components/shared-components/ChartWidget";
import AvatarStatus from "components/shared-components/AvatarStatus";
import GoalWidget from "components/shared-components/GoalWidget";
import Card from "components/shared-components/Card";
import Flex from "components/shared-components/Flex";

import {
  BandwidthChartData,
  AnnualStatisticData,
  ActiveMembersData,
  NewMembersData,
  RecentTransactionData,
} from "./DefaultDashboardData";
import ApexChart from "react-apexcharts";
// import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
import { SPACER } from "constants/ThemeConstant";
import {
  UserAddOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  PlusOutlined,
  EllipsisOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { useNavigate } from "react-router-dom";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const latestTransactionOption = [
  {
    key: "Refresh",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <ReloadOutlined />
        <span className="ml-2">Refresh</span>
      </Flex>
    ),
  },
  {
    key: "Print",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PrinterOutlined />
        <span className="ml-2">Print</span>
      </Flex>
    ),
  },
  {
    key: "Export",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <FileExcelOutlined />
        <span className="ml-2">Export</span>
      </Flex>
    ),
  },
];

const newJoinMemberOptions = [
  {
    key: "Bill All",
    label: (
      <Flex alignItems="center" gap={SPACER[2]}>
        <PlusOutlined />
        <span className="ml-2">Bill All</span>
      </Flex>
    ),
  },
];

const CardDropdown = ({ items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
      <a
        href="/#"
        className="text-gray font-size-lg"
        onClick={(e) => e.preventDefault()}
      >
        <EllipsisOutlined />
      </a>
    </Dropdown>
  );
};

const tableColumns = [
  {
    title: "Patient Name",
    dataIndex: "name",
    key: "name",
    render: (text, record) => (
      <div className="d-flex align-items-center">
        <Avatar
          size={30}
          className="font-size-sm"
          style={{ backgroundColor: record.avatarColor }}
        >
          {utils.getNameInitial(text)}
        </Avatar>
        <span className="ml-2">{text}</span>
      </div>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: () => <div className="text-right">Status</div>,
    key: "status",
    render: (_, record) => (
      <div className="text-right">
        <Tag
          className="mr-0"
          color={
            record.status === "Paid"
              ? "cyan"
              : record.status === "Pending"
              ? "blue"
              : "volcano"
          }
        >
          {record.status}
        </Tag>
      </div>
    ),
  },
];

export const DefaultDashboard = () => {
  const [visitorChartData] = useState(BandwidthChartData);
  const [annualStatisticData] = useState(AnnualStatisticData);
  const [activeMembersData] = useState(ActiveMembersData);
  const [newMembersData] = useState(NewMembersData);
  const [recentTransactionData] = useState(RecentTransactionData);
  const [appointmentRecords, setAppointmentRecords] = useState(null);
  const [todayAppCount, setTodayAppCount] = useState(0);
  const [allAppCount, setAppCount] = useState(0);
  const { direction } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const userRoles = userData?.roles || [];

  const isAdminOrDoctor =
    userRoles.includes("Admin") || userRoles.includes("Doctor");
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
    fetchAppointments();
  }, []);

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
            {annualStatisticData.map((elm, i) => (
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
          <Card
            title="New Patients"
            extra={<CardDropdown items={newJoinMemberOptions} />}
          >
            <div className="mt-3">
              {newMembersData.map((elm, i) => (
                <div
                  key={i}
                  className={`d-flex align-items-center justify-content-between mb-4`}
                >
                  <AvatarStatus
                    id={i}
                    src={elm.img}
                    name={elm.name}
                    subTitle={elm.title}
                  />
                  <div>
                    <Button
                      // change logo to bill
                      icon={<UserAddOutlined />}
                      type="default"
                      size="small"
                    >
                      Bill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card
            title="Latest Transactions"
            extra={<CardDropdown items={latestTransactionOption} />}
          >
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={recentTransactionData}
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
