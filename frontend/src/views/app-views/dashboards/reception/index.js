import React from "react";
import { Tabs, Row, Col } from "antd";
import TodaysAppointments from "./appointments";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { Link } from "react-router-dom";
import {
  OrderedListOutlined,
  ReconciliationOutlined,
  UserAddOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import LabRequest from "./labs";

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

const ReceptionDashboard = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
          <DisplayButtons />
        </Col>
      </Row>
      {/* <br></br> */}
      <Row gutter={16}>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "General",
                key: "1",
                children: <TodaysAppointments />,
              },
              {
                label: "Lab Requests",
                key: "2",
                children: <LabRequest />,
              },
            ]}
          />
        </div>
      </Row>
    </>
  );
};

export default ReceptionDashboard;
