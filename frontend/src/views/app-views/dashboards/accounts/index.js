import React, { useEffect, useState, useCallback } from "react";
import moment from "moment";
import { Row, Col, Button, Table, DatePicker, Select } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import Card from "components/shared-components/Card";
import { useNavigate } from "react-router-dom";
import utils from "utils";
import * as XLSX from "xlsx";

const { RangePicker } = DatePicker;
const { Option } = Select;

const base_apiUrl = process.env.REACT_APP_BASE_URL;

export const TransactionDashboard = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([]);
  const [paymentType, setPaymentType] = useState("All");
  const [transactions, setTransactions] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const userRoles = userData?.roles || [];
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isAdminOrDoctor =
    userRoles.includes("Admin") || userRoles.includes("Doctor");

  const fetchAllPayments = async () => {
    try {
      const response = await fetch(`${base_apiUrl}/allPayments`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const payments = data.payments;
      // console.log("All Payments:", payments);
      setTransactions(payments);
      setFilteredTransactions(payments); // Initialize with all payments
    } catch (error) {
      console.error("Error fetching payments:", error.message);
    }
  };

  const filterTransactions = useCallback((dateRange, paymentType) => {
    let filtered = transactions;

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange;
      const startDate = start.format();
      const endDate = end.format();
      setStartDate(startDate);
      setEndDate(endDate);
      filtered = filtered.filter((transaction) => {
        const transactionDate = moment(transaction.timeOfPayment);
        return transactionDate.isBetween(startDate, endDate, null, "[]");
      });
    }

    if (paymentType !== "All") {
      filtered = filtered.filter(
        (transaction) => transaction.paymentMethod === paymentType
      );
    }
    setFilteredTransactions(filtered);
  }, [transactions]);

  useEffect(() => {
    fetchAllPayments();
  }, []);

  useEffect(() => {
    filterTransactions(dateRange, paymentType);
  }, [dateRange, paymentType, transactions, filterTransactions]);

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredTransactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, `Transactions${startDate} to ${endDate}.xlsx`);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const tableColumns = [
    {
      title: "Payment ID",
      dataIndex: "receipt_id",
      key: "receipt_id",
    },
    {
      title: "Patient Name",
      dataIndex: ["appointment", "patient", "firstName"],
      key: "patient_name",
      render: (text, record) => (
        <span>
          {record.appointment.patient &&
            `${record.appointment.patient.firstName} ${record.appointment.patient.lastName}`}
        </span>
      ),
    },
    {
      title: "Date",
      dataIndex: "timeOfPayment",
      sorter: (a, b) => utils.antdTableSorter(a, b, "timeOfPayment"),
      render: (timeOfPayment) => (
        <span>{moment(timeOfPayment).format("D/MM/yyyy")}</span>
      ),
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
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Payment type",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "Received by",
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

  if (!isAdminOrDoctor) {
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
            <Col span={24}>
              <RangePicker
                onChange={handleDateRangeChange}
                disabledDate={disabledDate}
              />
              <Select
                value={paymentType}
                onChange={handlePaymentTypeChange}
                style={{ width: 120, marginLeft: 10 }}
              >
                <Option value="All">All</Option>
                <Option value="Cash">Cash</Option>
                <Option value="Card">Card</Option>
                <Option value="M-pesa">M-pesa</Option>
              </Select>
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                onClick={exportToCSV}
                style={{ marginLeft: 10 }}
              >
                Export
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={17}>
          <Card title="Latest Transactions">
            <Table
              className="no-border-last"
              columns={tableColumns}
              dataSource={filteredTransactions}
              rowKey="_id"
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TransactionDashboard;
