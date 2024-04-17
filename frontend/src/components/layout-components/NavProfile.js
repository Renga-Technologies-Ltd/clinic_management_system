import React, { useEffect, useState } from "react";
import { Dropdown, Avatar } from "antd";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import NavItem from "./NavItem";
import Flex from "components/shared-components/Flex";
import { signOut } from "store/slices/authSlice";
import styled from "@emotion/styled";
import {
  FONT_WEIGHT,
  MEDIA_QUERIES,
  SPACER,
  FONT_SIZES,
} from "constants/ThemeConstant";

// style component
const Icon = styled.div(() => ({
  fontSize: FONT_SIZES.LG,
}));
const Profile = styled.div(() => ({
  display: "flex",
  alignItems: "center",
}));
const UserInfo = styled("div")`
  padding-left: ${SPACER[2]};

  @media ${MEDIA_QUERIES.MOBILE} {
    display: none;
  }
`;
const Name = styled.div(() => ({
  fontWeight: FONT_WEIGHT.SEMIBOLD,
}));
const Title = styled.span(() => ({
  opacity: 0.8,
}));
// end of styled components

const MenuItem = (props) => (
  <Flex as="a" href={props.path} alignItems="center" gap={SPACER[2]}>
    <Icon>{props.icon}</Icon>
    <span>{props.label}</span>
  </Flex>
);

const MenuItemSignOut = (props) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div onClick={handleSignOut}>
      <Flex alignItems="center" gap={SPACER[2]}>
        <Icon>
          <LogoutOutlined />
        </Icon>
        <span>{props.label}</span>
      </Flex>
    </div>
  );
};

const items = [
  // {
  //   key: "Edit Profile",
  //   label: <MenuItem path="/" label="Edit Profile" icon={<EditOutlined />} />,
  // },
  // {
  //   key: "Account Setting",
  //   label: (
  //     <MenuItem path="/" label="Account Setting" icon={<SettingOutlined />} />
  //   ),
  // },
  // {
  //   key: "Account Billing",
  //   label: (
  //     <MenuItem path="/" label="Account Billing" icon={<ShopOutlined />} />
  //   ),
  // },
  // {
  //   key: "Help Center",
  //   label: (
  //     <MenuItem
  //       path="/"
  //       label="Help Center"
  //       icon={<QuestionCircleOutlined />}
  //     />
  //   ),
  // },
  {
    key: "Sign Out",
    label: <MenuItemSignOut label="Sign Out" />,
  },
];

export const NavProfile = ({ mode }) => {
  const [userData, setUserData] = useState({
    roles: [],
    profile: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []); // Empty dependency array ensures that this effect runs once on mount
  // Generate profile picture initials
  const initials = `${userData?.profile?.firstName[0]}${userData?.profile?.lastName[0]}`;

  return (
    <Dropdown placement="bottomRight" menu={{ items }} trigger={["click"]}>
      <NavItem mode={mode}>
        <Profile>
          <Avatar>{initials}</Avatar> {/* Use initials instead of the image */}
          <UserInfo className="profile-text">
            <Name>
              {userData?.profile?.firstName} {userData?.profile?.lastName}
            </Name>
            <Title>{userData?.roles}</Title>
          </UserInfo>
        </Profile>
      </NavItem>
    </Dropdown>
  );
};

export default NavProfile;
