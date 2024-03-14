import React, { useState, useEffect } from "react";
import { Card, Table, Input, Button, Menu } from "antd";
import {
  EyeOutlined,
  SearchOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { useNavigate } from "react-router-dom";
import utils from "utils";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

const UserList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = `${base_apiUrl}/users`;
        const response = await fetch(apiUrl);
        const { users } = await response.json();

        // console.log(users);
        if (Array.isArray(users)) {
          setList(users);
        } else {
          console.error("Invalid data structure:", users);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchUsers();
  }, []);
  console.log(list);

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
  const addUser = () => {
    navigate(`/app/pages/register`);
  };

  const viewDetails = (row) => {
    console.log(row); // Log the row object to the console
    // navigate(`/app/pages/profile/${row}`);
    navigate(`/app/pages/profile`);
  };

  const tableColumns = [
    {
      title: "User ID",
      dataIndex: "_id",
      render: (_, record) => (
        <div>
          <NumberFormat displayType={"text"} value={record._id} />
        </div>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "profile",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            size={60}
            type="square"
            src={record.profile.firstName + " " + record.profile.lastName}
            name={record.profile.firstName + " " + record.profile.lastName}
          />
        </div>
      ),
      sorter: (a, b) => utils.antdTableSorter(a, b, "name"),
    },
    {
      title: "Speciliazation",
      dataIndex: "profile.specialization",
      sorter: (a, b) => utils.antdTableSorter(a, b, "profile.specialization"),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      sorter: (a, b) => utils.antdTableSorter(a, b, "roles"),
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
    const value = e.currentTarget.value;
    const searchArray = e.currentTarget.value ? list : list;
    const data = utils.wildCardSearch(searchArray, value);
    setList(data);
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
        </Flex>
        <div>
          <Button
            onClick={addUser}
            type="primary"
            icon={<PlusCircleOutlined />}
            block
          >
            User
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table columns={tableColumns} dataSource={list} rowKey="id" />
      </div>
    </Card>
  );
};

export default UserList;
