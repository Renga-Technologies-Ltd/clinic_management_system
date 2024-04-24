import React, { useState, useEffect } from "react";
import { Card, Table, Input, Button, Menu } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { useNavigate } from "react-router-dom";
import utils from "utils";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const PatientList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const apiUrl = `${base_apiUrl}/allpatient`;
        const response = await fetch(apiUrl);
        const { patients } = await response.json(); // Destructure patients from the response
        // Check if the data is an array
        if (Array.isArray(patients)) {
          setList(patients);
        } else {
          console.error("Invalid data structure:", patients);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row._id)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
    </Menu>
  );
  const addPatient = () => {
    navigate(`/app/apps/patient/add-patient`);
  };

  const viewDetails = (row) => {
    console.log(row); // Log the row object to the console
    navigate(`/app/apps/patient/patient-details/${row}`);
  };

  const tableColumns = [
    {
      title: "Patient Record ID",
      dataIndex: "_id",
      render: (_, record) => <div>{record.patient_id}</div>,
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">{record.firstName + " " + record.lastName}</div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      sorter: (a, b) => utils.antdTableSorter(a, b, "contactNumber"),
    },
    {
      title: "DOB",
      dataIndex: "dateOfBirth",
      sorter: (a, b) => utils.antdTableSorter(a, b, "dateOfBirth"),
      render: (dateOfBirth) => (
        <span>{moment(dateOfBirth).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (age, record) => {
        if (age) {
          return <span>{age}</span>; // If age is available, render it directly
        } else if (record.dateOfBirth) {
          // If age is not available but dateOfBirth is provided, calculate the age
          return (
            <span>{moment().diff(moment(record.dateOfBirth), "years")}</span>
          );
        } else {
          return null; // If neither age nor dateOfBirth is available, render nothing
        }
      },
    },

    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => utils.antdTableSorter(a, b, "gender"),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, record) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(record)} />
        </div>
      ),
    },
  ];

  const onSearch = (e) => {
    const value = e.currentTarget.value.trim();
    setList(value === "" ? [...list] : utils.wildCardSearch(list, value));
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Card>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mobileFlex={false}
      >
        <Flex className="mb-1" mobileFlex={false}>
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div>
            <Button
              onClick={handleRefresh}
              // type="primary"
              icon={<ReloadOutlined />}
              block
            >
              Reload
            </Button>
          </div>
        </Flex>

        <div>
          <Button
            onClick={addPatient}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            New Patient
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default PatientList;
