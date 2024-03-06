import React, { Component } from "react";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
import UserView from "./UserView";
import AvatarStatus from "components/shared-components/AvatarStatus";
const base_apiUrl = process.env.REACT_APP_BASE_URL;

export class UserList extends Component {
  state = {
    users: [], // Initialize users as an empty array
    userProfileVisible: false,
    selectedUser: null,
  };

  componentDidMount() {
    // Fetch users from the API endpoint
    fetch(`${base_apiUrl}/users`) // Update the URL with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.users });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // Handle error, show a message, etc.
      });
  }

  deleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((item) => item.id !== userId),
    });
    message.success({ content: `Deleted user ${userId}`, duration: 2 });
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  render() {
    const { users, userProfileVisible, selectedUser } = this.state;

    const tableColumns = [
      {
        title: "User",
        dataIndex: "profile",
        render: (profile, record) => (
          <div className="d-flex">
            <AvatarStatus
              src={profile.profilePicture}
              name={`${profile.firstName} ${profile.lastName}`}
              subTitle={profile.email}
            />
          </div>
        ),
        sorter: {
          compare: (a, b) => {
            a = `${a.profile.firstName} ${a.profile.lastName}`.toLowerCase();
            b = `${b.profile.firstName} ${b.profile.lastName}`.toLowerCase();
            return a > b ? -1 : b > a ? 1 : 0;
          },
        },
      },
      {
        title: "Email",
        dataIndex: "username",
        sorter: {
          compare: (a, b) => a.length - b.length,
        },
      },
      {
        title: "Roles",
        dataIndex: "roles",
        render: (roles) => <Tag>{roles[0]}</Tag>,
        sorter: {
          compare: (a, b) => a.roles[0].length - b.roles[0].length,
        },
      },
      {
        title: "",
        dataIndex: "actions",
        render: (_, elm) => (
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteUser(elm._id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];
    return (
      <Card bodyStyle={{ padding: "0px" }}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={users} rowKey="id" />
        </div>
        <UserView
          data={selectedUser}
          visible={userProfileVisible}
          close={() => {
            this.closeUserProfile();
          }}
        />
      </Card>
    );
  }
}

export default UserList;
