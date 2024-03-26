import React, { useState, useEffect } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import NumberFormat from "react-number-format";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const Invoice = (props) => {
  const receipt = props.paymentId;
  const [invoiceData, setInvoiceData] = useState(null); // Initialize state as null

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/getPayment/${receipt}`);
        const responseData = await response.json();
        if (response.ok) {
          setInvoiceData(responseData.payment); // Set fetched invoice data to state
        } else {
          console.error("Error fetching invoice data:", responseData.message);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    if (receipt) {
      fetchInvoiceData(); // Fetch invoice data only if receipt ID exists
    }
  }, [receipt]); // Fetch invoice data whenever receipt ID changes

  const formatDate = (dateString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Use 24-hour format
    };
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", options);
  };

  const printDiv = () => {
    const printableContent = document.querySelector(".printable-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printableContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container">
      <Card>
        {invoiceData && (
          <div className="printable-content">
            <div className="d-md-flex justify-content-md-between">
              <div>
                <img src="/img/logo.png" alt="" />
                <address>
                  <p>
                    <span className="font-weight-semibold text-dark font-size-md">
                      Mahapatra Medi-Care Limited
                    </span>
                    <br />
                    <span>6th Floor; B Wing, Doctor's Park</span>
                    <br />
                    <span>3rd Parklands Avenue</span>
                    <br />
                    <span>P.O Box: 38158 -00628</span>
                    <br />
                    <span>Nairobi, Kenya</span>
                    <br />
                    <abbr className="text-dark" title="Phone">
                      Phone:
                    </abbr>
                    <span> (254)743349929</span>
                  </p>
                </address>
              </div>
              <div className="mt-3 text-right">
                <h2 className="mb-1 font-weight-semibold">
                  Receipt: {invoiceData.receipt_id}
                </h2>
                <p>{formatDate(invoiceData.timeOfPayment)}</p>
                <address>
                  <p>
                    <span className="font-weight-semibold text-dark font-size-md">
                      {" "}
                    </span>
                    <span>
                      {invoiceData.appointment.patient.firstName}{" "}
                      {invoiceData.appointment.patient.lastName}
                    </span>{" "}
                    <br />
                  </p>
                </address>
              </div>
            </div>
            <div className="mt-3">
              {/* Display invoice narration here */}
              <hr />
              <p>
                Received with thanks Ksh. {invoiceData.amount}/- only from
                <strong>
                  {" "}
                  <span>
                    {invoiceData.appointment.patient.firstName}{" "}
                    {invoiceData.appointment.patient.lastName}
                  </span>{" "}
                </strong>
                on
                <strong>
                  {" "}
                  {formatDate(invoiceData.timeOfPayment)}
                </strong> for{" "}
                <strong> {invoiceData.paymentType} consultation.</strong> <br />
                <br />
                <hr />
                <br /> Method of payment:{" "}
                <strong> {invoiceData.paymentMethod} </strong>
              </p>
            </div>
          </div>
        )}

        <div className="d-print-none">
          <Button type="primary" onClick={printDiv}>
            <PrinterOutlined />
            <span className="ml-1">Print</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
