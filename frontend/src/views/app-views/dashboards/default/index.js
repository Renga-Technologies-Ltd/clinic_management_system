import React, { useState } from "react";
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
import { apexLineChartDefaultOption, COLOR_2 } from "constants/ChartConstant";
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


const MembersChart = (props) => <ApexChart {...props} />;

const memberChartOption = {
  ...apexLineChartDefaultOption,
  ...{
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors: [COLOR_2],
  },
};

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
  const { direction } = useSelector((state) => state.theme);
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
            title="Monthly Target"
            value={87}
            subtitle="You need abit more effort to hit monthly target"
            extra={<Button type="primary">Learn More</Button>}
          />
          <StatisticWidget
            title={
              <MembersChart
                options={memberChartOption}
                series={activeMembersData}
                height={145}
              />
            }
            // value="17,329"
            status={3.7}
            subtitle="Active members"
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
