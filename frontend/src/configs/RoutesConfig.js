import React from "react";
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "configs/AppConfig";

export const publicRoutes = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login")
    ),
  },

  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/forgot-password")
    ),
  },
  {
    key: "error-page-1",
    path: `${AUTH_PREFIX_PATH}/error-page-1`,
    component: React.lazy(() => import("views/auth-views/errors/error-page-1")),
  },
];

export const protectedRoutes = [
  {
    key: "dashboard.default",
    path: `${APP_PREFIX_PATH}/dashboards/default`,
    component: React.lazy(() => import("views/app-views/dashboards/default")),
  },

  //main dashboard
  {
    key: "dashboard.reception",
    path: `${APP_PREFIX_PATH}/dashboards/reception`,
    component: React.lazy(() => import("views/app-views/dashboards/reception")),
  },
  {
    key: "dashboard.nurse",
    path: `${APP_PREFIX_PATH}/dashboards/nurse`,
    component: React.lazy(() => import("views/app-views/dashboards/nurse")),
  },
  {
    key: "dashboard.nurse.examination",
    path: `${APP_PREFIX_PATH}/dashboards/nurse/examination/:appointment_id`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/nurse/Examination")
    ),
  },
  {
    key: "dashboard.doctor",
    path: `${APP_PREFIX_PATH}/dashboards/doctor`,
    component: React.lazy(() => import("views/app-views/dashboards/doctor")),
  },
  {
    key: "dashboard.doctor.consultation",
    path: `${APP_PREFIX_PATH}/dashboards/doctor/consultation/:appointment_id`,
    component: React.lazy(() =>
      import("views/app-views/dashboards/doctor/Consultation")
    ),
  },
  //end main dashboard
  {
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    component: React.lazy(() => import("views/app-views/apps")),
  },
  {
    key: "apps.calendar",
    path: `${APP_PREFIX_PATH}/apps/calendar`,
    component: React.lazy(() => import("views/app-views/apps/calendar")),
  },
  {
    key: "apps.appointments",
    path: `${APP_PREFIX_PATH}/apps/appointments`,
    component: React.lazy(() => import("views/app-views/apps/appointments")),
  },

  // patients routes
  {
    key: "apps.patient",
    path: `${APP_PREFIX_PATH}/apps/patient`,
    component: React.lazy(() => import("views/app-views/apps/patient")),
  },
  {
    key: "apps.patient.add-patient",
    path: `${APP_PREFIX_PATH}/apps/patient/add-patient`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/add-patient")
    ),
  },
  {
    key: "apps.patient.add-appointment",
    path: `${APP_PREFIX_PATH}/apps/patient/add-appointment`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/add-appointment")
    ),
  },
  {
    key: "apps.patient.patient-details",
    path: `${APP_PREFIX_PATH}/apps/patient/patient-details/:id`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/patient-details")
    ),
  },
  {
    key: "apps.patient.edit-patient",
    path: `${APP_PREFIX_PATH}/apps/patient/edit-patient/:id`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/edit-patient")
    ),
  },
  {
    key: "apps.patient.edit-patient",
    path: `${APP_PREFIX_PATH}/apps/patient/pay-appointment/:appointment_id`,
    component: React.lazy(() => import("views/app-views/apps/patient/payment")),
  },
  {
    key: "apps.patient.patient-list",
    path: `${APP_PREFIX_PATH}/apps/patient/patient-list`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/patient-list")
    ),
  },
  {
    key: "apps.patient.appointments",
    path: `${APP_PREFIX_PATH}/apps/patient/appointments`,
    component: React.lazy(() =>
      import("views/app-views/apps/patient/appointments")
    ),
  },
  // end of patients routes
  {
    key: "components.general",
    path: `${APP_PREFIX_PATH}/components/general`,
    component: React.lazy(() => import("views/app-views/components/general")),
  },

  {
    key: "components.maps",
    path: `${APP_PREFIX_PATH}/components/maps`,
    component: React.lazy(() => import("views/app-views/components/maps")),
  },
  {
    key: "components.maps.simple-map",
    path: `${APP_PREFIX_PATH}/components/maps/simple-map`,
    component: React.lazy(() =>
      import("views/app-views/components/maps/simple-map")
    ),
  },
  {
    key: "login-1",
    path: `${APP_PREFIX_PATH}/login-1`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login-1")
    ),
    meta: {
      blankLayout: true,
    },
  },

  {
    key: "register-1",
    path: `${APP_PREFIX_PATH}/register-1`,
    component: React.lazy(() => import("views/app-views/pages/register")),
    meta: {
      blankLayout: true,
    },
  },

  {
    key: "forgot-password",
    path: `${APP_PREFIX_PATH}/forgot-password`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/forgot-password")
    ),
    meta: {
      blankLayout: true,
    },
  },
  {
    key: "error-page-1",
    path: `${APP_PREFIX_PATH}/error-page-1`,
    component: React.lazy(() => import("views/auth-views/errors/error-page-1")),
    meta: {
      blankLayout: true,
    },
  },

  {
    key: "pages",
    path: `${APP_PREFIX_PATH}/pages`,
    component: React.lazy(() => import("views/app-views/pages")),
  },
  {
    key: "pages.profile",
    path: `${APP_PREFIX_PATH}/pages/profile`,
    component: React.lazy(() => import("views/app-views/pages/profile")),
  },
  {
    key: "pages.invoice",
    path: `${APP_PREFIX_PATH}/pages/invoice`,
    component: React.lazy(() => import("views/app-views/pages/invoice")),
  },
  {
    key: "pages.pricing",
    path: `${APP_PREFIX_PATH}/pages/pricing`,
    component: React.lazy(() => import("views/app-views/pages/pricing")),
  },
  {
    key: "pages.faq",
    path: `${APP_PREFIX_PATH}/pages/faq`,
    component: React.lazy(() => import("views/app-views/pages/faq")),
  },
  {
    key: "pages.setting",
    path: `${APP_PREFIX_PATH}/pages/setting/*`,
    component: React.lazy(() => import("views/app-views/pages/setting")),
  },
  {
    key: "pages.user-list",
    path: `${APP_PREFIX_PATH}/pages/user-list`,
    component: React.lazy(() => import("views/app-views/pages/user-list")),
  },
  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: React.lazy(() => import("views/app-views/pages/register")),
  },
  {
    key: "pages.add-patient",
    path: `${APP_PREFIX_PATH}/pages/add-patient`,
    component: React.lazy(() => import("views/app-views/pages/add-patient")),
  },
  
];
