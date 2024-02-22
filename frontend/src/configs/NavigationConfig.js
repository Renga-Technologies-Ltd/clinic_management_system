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
            key: "extra-pages-pricing",
            path: `${APP_PREFIX_PATH}/pages/pricing`,
            title: "sidenav.pages.pricing",
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
      // {
      //   key: "extra-auth",
      //   path: `${APP_PREFIX_PATH}`,
      //   title: "sidenav.authentication",
      //   icon: SafetyOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: "extra-auth-login-1",
      //       path: `${APP_PREFIX_PATH}/login-1`,
      //       title: "sidenav.authentication.login.1",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },

      //     {
      //       key: "extra-auth-forgot-password",
      //       path: `${APP_PREFIX_PATH}/forgot-password`,
      //       title: "sidenav.authentication.forgetPassword",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //   ],
      // },
      // {
      //   key: "extra-errors",
      //   path: `${APP_PREFIX_PATH}/error-1`,
      //   title: "sidenav.errors",
      //   icon: StopOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: "extra-errors-error-1",
      //       path: `${APP_PREFIX_PATH}/error-page-1`,
      //       title: "sidenav.errors.error.1",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-errors-error-2",
      //       path: `${APP_PREFIX_PATH}/error-page-2`,
      //       title: "sidenav.errors.error.2",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //   ],
      // },
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
      // {
      //   key: "dashboards-analytic",
      //   path: `${APP_PREFIX_PATH}/dashboards/analytic`,
      //   title: "sidenav.dashboard.analytic",
      //   icon: DotChartOutlined,
      //   breadcrumb: false,
      //   submenu: [],
      // },
      // main dashboard
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

          // {
          //   key: "apps-patient-editProduct",
          //   path: `${APP_PREFIX_PATH}/apps/patient/edit-product/12`,
          //   title: "sidenav.apps.patient.editProduct",
          //   icon: "",
          //   breadcrumb: false,
          //   submenu: [],
          // },
          // {
          //   key: "apps-patient-orders",
          //   path: `${APP_PREFIX_PATH}/apps/patient/orders`,
          //   title: "sidenav.apps.patient.orders",
          //   icon: "",
          //   breadcrumb: false,
          //   submenu: [],
          // },
        ],
      },
    ],
  },
];

const navigationConfig = [...dashBoardNavTree, ...appsNavTree, ...extraNavTree];

export default navigationConfig;
