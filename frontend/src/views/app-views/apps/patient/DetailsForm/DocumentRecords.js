/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Modal, Popover } from "antd";
import utils from "utils";
import moment from "moment";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const PatientDocuments = (props) => {
  const { patientId } = props;

  const [medicalDocuments, setMedicalDocuments] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documentContent, setDocumentContent] = useState(null);

  useEffect(() => {
    const getDocumentRecords = async () => {
      try {
        const response = await fetch(
          `${base_apiUrl}/getFilesByPatient/${patientId}`
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setMedicalDocuments(data);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    getDocumentRecords();
  }, [patientId]);

  const handleDocumentClick = async (document) => {
    setSelectedDocument(document);
    try {
      const response = await fetch(
        `${base_apiUrl}/getDocument/${document.fileName}`
      );
      const documentContent = await response.blob();
      setDocumentContent(documentContent);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  const content = (
    <div>
      <p>Click on Document Number to open Document</p>
    </div>
  );

  const handleModalClose = () => {
    setIsModalVisible(false);
    setDocumentContent(null);
  };

  const tableColumns = [
    {
      title: "Document Number",
      dataIndex: "documentNumber",
      render: (_, record) => (
        <div>
          <Popover content={content} title="Open Document">
            <a onClick={() => handleDocumentClick(record)}>
              {record.documentNumber}
            </a>
          </Popover>
        </div>
      ),
    },
    {
      title: "File Name",
      dataIndex: "fileName",
      render: (_, record) => (
        <div onClick={() => handleDocumentClick(record)}>{record.fileName}</div>
      ),
    },
    {
      title: "Date Uploaded",
      dataIndex: "dateUploaded",
      sorter: (a, b) => utils.antdTableSorter(a, b, "dateUploaded"),
      render: (dateUploaded) => (
        <span>{moment(dateUploaded).format("MMMM Do YYYY, h:mm:ss a")}</span>
      ),
    },
  ];

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Documents">
          <div className="table-responsive">
            <Table
              columns={tableColumns}
              dataSource={medicalDocuments}
              rowKey="_id"
            />
          </div>
        </Card>
      </Col>
      <Modal
        title={selectedDocument ? selectedDocument.fileName : ""}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {documentContent && (
          <iframe
            title="Document Viewer"
            src={URL.createObjectURL(documentContent)}
            style={{ width: "100%", height: "500px" }}
          />
        )}
      </Modal>
    </Row>
  );
};

export default PatientDocuments;
