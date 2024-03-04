import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table } from "antd";
import NumberFormat from "react-number-format";
import utils from "utils";

const MedicalRecords = (props) => {
  const { patientId } = props;
  
  const [medicalRecords, setMedicalRecords] = useState(null);
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/getMedicalrecords/${patientId}`
        );
        const data = await response.json();
        if (Array.isArray(data.medicalRecords)) {
          setMedicalRecords(data.medicalRecords);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchMedicalRecords();
  }, [patientId]);

  const tableColumns = [
    {
      title: "Patient Record ID",
      dataIndex: "_id",
      render: (_, record) => (
        <div>
          <NumberFormat displayType={"text"} value={record._id} />
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
    },
    {
      title: "Diagnostic",
      dataIndex: "diagnosis",
      sorter: (a, b) => utils.antdTableSorter(a, b, "diagnosis"),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      sorter: (a, b) => utils.antdTableSorter(a, b, "notes"),
    },
    {
      title: "Doctor",
      dataIndex: "createdBy",
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdBy"),
    },
  ];
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Medical Records">
          <div className="table-responsive">
            <Table
              columns={tableColumns}
              dataSource={medicalRecords}
              rowKey="_id"
            />
          </div>
        </Card>
       
      </Col>
    </Row>
  );
};

export default MedicalRecords;
