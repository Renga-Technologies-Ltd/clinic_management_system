import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  UsergroupAddOutlined,
  HomeOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  APP_PREFIX_PATH,
  // AUTH_PREFIX_PATH
} from "configs/AppConfig";

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
          {
            key: "extra-pages-profile",
            path: `${APP_PREFIX_PATH}/pages/profile`,
            title: "sidenav.pages.profile",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "extra-pages-list",
            path: `${APP_PREFIX_PATH}/pages/user-list`,
            title: "sidenav.pages.userlist",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "extra-pages-invoice",
            path: `${APP_PREFIX_PATH}/pages/invoice`,
            title: "sidenav.pages.invoice",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },        
          {
            key: "extra-pages-faq",
            path: `${APP_PREFIX_PATH}/pages/faq`,
            title: "sidenav.pages.faq",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "extra-pages-setting",
            path: `${APP_PREFIX_PATH}/pages/setting`,
            title: "sidenav.pages.setting",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    isGroupTitle: true,
    submenu: [      
      {
        key: "dashboards-reception",
        path: `${APP_PREFIX_PATH}/dashboards/reception`,
        title: "sidenav.dashboard.reception",
        icon: HomeOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-nurse",
        path: `${APP_PREFIX_PATH}/dashboards/nurse`,
        title: "sidenav.dashboard.nurse",
        icon: HomeOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboards-doctor",
        path: `${APP_PREFIX_PATH}/dashboards/doctor`,
        title: "sidenav.dashboard.doctor",
        icon: HomeOutlined,
        breadcrumb: false,
        submenu: [],
      },
      // end main dashboard
    ],
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

const navigationConfig = [...dashBoardNavTree, ...appsNavTree, ...extraNavTree];

export default navigationConfig;
