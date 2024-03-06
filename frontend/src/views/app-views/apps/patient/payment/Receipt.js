import React, { useState, useEffect } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Table, Button, Spin, Alert } from "antd";
import NumberFormat from "react-number-format";
import utils from "utils";
import moment from "moment";
const { Column } = Table;
const base_apiUrl = process.env.REACT_APP_BASE_URL;
const Invoice = (props) => {
  const appointment = props;
  const appointment_id = appointment.appointment.appointment_id;
  const [invoiceData, setInvoiceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const type = "first_time";
        const response = await fetch(
          `${base_apiUrl}/getPayment/${appointment_id}/${type}`
        );
        const data = await response.json();
        setInvoiceData(data.payment); // assuming the API response is an array of invoice items
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchInvoiceData();
  }, []);
  console.log(invoiceData);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error fetching invoice data" type="error" />;
  }
  const mapPaymentTypeToText = (paymentType) => {
    switch (paymentType) {
      case "first_time":
        return "First time consultation";
      case "follow-up":
        return "Follow up with 7 days";
      case "Lab":
        return "Lab payments";
      default:
        return paymentType; // return original value if not found
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
      title: "Service",
      dataIndex: "paymentType",
      key: "paymentType",
      render: (paymentType) => mapPaymentTypeToText(paymentType),
    },
    {
      title: "Time",
      dataIndex: "timeOfPayment",
      render: (appointmentTime) => (
        <span>{moment(appointmentTime).format("MMMM Do YYYY, h:mm:ss a")}</span>
      ),
    },
  ];

  return (
    <div className="container">
      <Card>
        <div className="d-md-flex justify-content-md-between">
          <div>
            <img src="/img/logo.png" alt="" />
            <address>
              <p>
                <span className="font-weight-semibold text-dark font-size-md">
                  CMS, Inc.
                </span>
                <br />
                <span>00100 Nairobi</span>
                <br />
                <span>Nairobi, Kenya</span>
                <br />
                <abbr className="text-dark" title="Phone">
                  Phone:
                </abbr>
                <span>(254) 722545735</span>
              </p>
            </address>
          </div>
          <div className="mt-3 text-right">
            <h2 className="mb-1 font-weight-semibold">
              Invoice {invoiceData[0]._id}
            </h2>
            <p>16/01/204</p>
            <address>
              <p>
                <span className="font-weight-semibold text-dark font-size-md">
                  {invoiceData[0].appointment.patient
                    ? invoiceData[0].appointment.patient.firstName +
                      " " +
                      invoiceData[0].appointment.patient.lastName
                    : "Unknown"}
                </span>
                <br />
                {invoiceData[0].appointment.patient
                  ? invoiceData[0].appointment.patient.address.city
                  : "Unknown Address"}
                <br />
              </p>
            </address>
          </div>
        </div>
        <div className="mt-4">
          <Table
            pagination={false}
            columns={tableColumns}
            dataSource={[invoiceData[0]]}
            className="mb-5"
          ></Table>
          <div className="d-flex justify-content-end">
            <div className="text-right ">
              <div className="border-bottom">
                <p className="mb-2">
                  <span>Sub - Total amount: </span>

                  <NumberFormat
                    displayType={"text"}
                    value={invoiceData[0].amount}
                    prefix={"Ksh"}
                    thousandSeparator={true}
                  />
                </p>
                <p className="mb-2">
                  <span>Payment Method </span>
                  {invoiceData[0].paymentMethod}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-5">
            <small>
              In exceptional circumstances, Financial Services can provide an
              urgent manually processed special cheque. Note, however, that
              urgent special cheques should be requested only on an emergency
              basis as manually produced cheques involve duplication of effort
              and considerable staff resources. Requests need to be supported by
              a letter explaining the circumstances to justify the special
              cheque payment
            </small>
          </p>
        </div>
        <hr className="d-print-none" />
        <div className="text-right d-print-none">
          <Button type="primary" onClick={() => window.print()}>
            <PrinterOutlined type="printer" />
            <span className="ml-1">Print</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
