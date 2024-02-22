import React from "react";
import { Row, Col, Card, Table, Tag, Badge } from "antd";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
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
// import ChartWidget from "components/shared-components/ChartWidget";
// import { COLORS } from "constants/ChartConstant";
import { recentOrderData } from "./SalesDashboardData";
import dayjs from "dayjs";
import { DATE_FORMAT_DD_MM_YYYY } from "constants/DateConstant";
import utils from "utils";
// import { useSelector } from "react-redux";
// const { Option } = Select;
const getPaymentStatus = (status) => {
  if (status === "Paid") {
    return "success";
  }
  if (status === "Pending") {
    return "warning";
  }
  if (status === "Expired") {
    return "error";
  }
  return "";
};

const getShippingStatus = (status) => {
  if (status === "Ready") {
    return "blue";
  }
  if (status === "Shipped") {
    return "cyan";
  }
  return "";
};
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
      <Link to="/pages/view-appointments">
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
      <Link to="/pages/patients-list">
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
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Product",
    dataIndex: "name",
    render: (_, record) => (
      <Flex>
        <AvatarStatus size={30} src={record.image} name={record.name} />
      </Flex>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
  },
  {
    title: "Date",
    dataIndex: "date",
    render: (_, record) => (
      <span>{dayjs.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "date"),
  },
  {
    title: "Order status",
    dataIndex: "orderStatus",
    render: (_, record) => (
      <>
        <Tag color={getShippingStatus(record.orderStatus)}>
          {record.orderStatus}
        </Tag>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "orderStatus"),
  },
  {
    title: "Payment status",
    dataIndex: "paymentStatus",
    render: (_, record) => (
      <>
        <Badge status={getPaymentStatus(record.paymentStatus)} />
        <span className="mx-2">{record.paymentStatus}</span>
      </>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "paymentStatus"),
  },
  {
    title: "Total",
    dataIndex: "amount",
    render: (_, record) => (
      <span className="font-weight-semibold">
        <NumberFormat
          displayType={"text"}
          value={(Math.round(record.amount * 100) / 100).toFixed(2)}
          prefix={"$"}
          thousandSeparator={true}
        />
      </span>
    ),
    sorter: (a, b) => utils.antdTableSorter(a, b, "amount"),
  },
];
const TodaysAppointments = () => (
  <Card title="Upcoming Appointments">
    <Table
      pagination={false}
      columns={tableColumns}
      dataSource={recentOrderData}
      rowKey="id"
    />
  </Card>
);

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
