import React, { useState, useEffect } from "react";
import { PrinterOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import moment from "moment";

const base_apiUrl = process.env.REACT_APP_BASE_URL;

const ReceiptTemplate = ({ receiptData }) => {
  //   console.log(receiptData);
  const receipt = receiptData.payment._id;
  const [invoiceData, setInvoiceData] = useState(null); // Initialize state as null
  const [appoinmentId, setAppoinmentId] = useState(null);
  const [labRecords, setLabRecords] = useState(null);
  //   console.log(receipt);
  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await fetch(`${base_apiUrl}/getPayment/${receipt}`);
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setInvoiceData(responseData.payment);
          setAppoinmentId(responseData.appointment);
        } else {
          console.error("Error fetching invoice data:", responseData.message);
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };
    const fetchLabRecords = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/getLabResults/${appoinmentId}`
        );
        const data = await response.json();
        setLabRecords(data);

        console.log(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    if (receipt) {
      fetchInvoiceData();
      fetchLabRecords();
      // Fetch invoice data only if receipt ID exists
    }
  }, [receipt, appoinmentId]);
  const printDiv = () => {
    const printableContent = document.querySelector(".printable-content");
    if (printableContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow.document.write(printableContent.innerHTML);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Printable content not found");
    }
  };

  const formatDate = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm a");
  };

  return (
    <div className="container">
      <Card>
        {invoiceData && (
          <div className="printable-content">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Logo and Address */}
              <div style={{ width: "50%" }}>
                <img src="/img/logo.png" alt="" />
              </div>
              {/* Receipt Details */}
              <div style={{ width: "50%", textAlign: "right" }}>
                <p>
                  <span className="font-weight-semibold text-dark font-size-md">
                    <strong>Mahapatra Medi-Care Limited</strong>
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
              </div>
            </div>
            <div className="mt-3">
              <address>
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
              </address>
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
                <strong>
                  {invoiceData.paymentType === "Lab" &&
                  labRecords &&
                  labRecords.labResults &&
                  labRecords.labResults.length > 0
                    ? labRecords.labResults[0].labRequest.testType
                    : invoiceData.paymentType}{" "}
                  Consultation
                </strong>
                <br />
                <hr />
                <br /> Method of payment:{" "}
                <strong> {invoiceData.paymentMethod} </strong>
              </p>

              <hr></hr>
              <p>
                <strong>Received by: </strong>
                <span>
                  {invoiceData.receivedBy.profile.firstName}{" "}
                  {invoiceData.receivedBy.profile.lastName}
                </span>
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

export default ReceiptTemplate;
