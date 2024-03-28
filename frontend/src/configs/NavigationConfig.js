// navigationConfig.js

import {
  AppstoreOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { APP_PREFIX_PATH } from "configs/AppConfig";

const getUserRole = () => {
  // Get user details from local storage
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  // Check if user details exist and contain roles
  if (userDetails && userDetails.roles) {
    // For simplicity, assuming the user has only one role (you may modify as needed)
    return userDetails.roles[0];
  }

  // Default role if user details are not available or roles are not defined
  return "Admin";
};
const doctorDashboard = [
  {
    key: "dashboards-doctor",
    path: `${APP_PREFIX_PATH}/dashboards/doctor`,
    title: "sidenav.dashboard.doctor",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const nurseDashboard = [
  {
    key: "dashboards-nurse",
    path: `${APP_PREFIX_PATH}/dashboards/nurse`,
    title: "sidenav.dashboard.nurse",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const ReceptionDashboard = [
  {
    key: "dashboards-reception",
    path: `${APP_PREFIX_PATH}/dashboards/reception`,
    title: "sidenav.dashboard.reception",
    icon: HomeOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const appsNavTree = [
  {
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    title: "sidenav.apps",
    icon: AppstoreOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [
      {
        key: "apps-calendar",
        path: `${APP_PREFIX_PATH}/apps/calendar`,
        title: "sidenav.apps.calendar",
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "apps-appointments",
        path: `${APP_PREFIX_PATH}/apps/appointments`,
        title: "sidenav.apps.appointments",
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "apps-patient",
        path: `${APP_PREFIX_PATH}/apps/patient`,
        title: "sidenav.apps.patient",
        icon: UsergroupAddOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "apps-patient-addPatient",
            path: `${APP_PREFIX_PATH}/apps/patient/add-patient`,
            title: "sidenav.apps.patient.addPatient",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-patient-patient-list",
            path: `${APP_PREFIX_PATH}/apps/patient/patient-list`,
            title: "sidenav.apps.patient.patient-list",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];
const extraNavTree = [
  {
    key: "extra",
    path: `${APP_PREFIX_PATH}/pages`,
    title: "sidenav.pages",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    isGroupTitle: true,
    submenu: [
      {
        key: "extra-pages",
        path: `${APP_PREFIX_PATH}/pages`,
        title: "sidenav.pages",
        icon: FileTextOutlined,
        breadcrumb: true,
        submenu: [
          // to be added later
          // {
          //   key: "extra-pages-profile",
          //   path: `${APP_PREFIX_PATH}/pages/profile`,
          //   title: "sidenav.pages.profile",
          //   icon: "",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          {
            key: "extra-pages-list",
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: "sidenav.pages.userlist",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const doctorDashBoardNavTree = doctorDashboard.filter((item) => {
  const allowedRoles = ["Doctor", "Admin"];
  return allowedRoles.includes(getUserRole()) || !item.isGroupTitle;
});

const nurseDashBoardNavTree = nurseDashboard.filter((item) => {
  const nurseAllowedRoles = ["Nurse", "Admin"];
  return nurseAllowedRoles.includes(getUserRole()) || !item.isGroupTitle;
});

const receptionDashBoardNavTree = ReceptionDashboard.filter((item) => {
  const receptionistAllowedRoles = ["Reception", "Admin"];
  return receptionistAllowedRoles.includes(getUserRole()) || !item.isGroupTitle;
});

const filteredAppsNavTree = appsNavTree.filter((item) => {
  const allowedRoles = ["Doctor", "Nurse", "Reception","Admin"];
  return allowedRoles.includes(getUserRole()) || !item.isGroupTitle;
});

const filteredExtraNavTree = extraNavTree.filter((item) => {
  const allowedRoles = ["Doctor", "Admin"];
  return allowedRoles.includes(getUserRole()) || !item.isGroupTitle;
});

const navigationConfig = [
  ...receptionDashBoardNavTree,
  ...nurseDashBoardNavTree,
  ...doctorDashBoardNavTree,
  ...filteredAppsNavTree,
  ...filteredExtraNavTree,
  // ...extraNavTree,
  // ...appointmentNavTreeFiltered,
];

export default navigationConfig;
