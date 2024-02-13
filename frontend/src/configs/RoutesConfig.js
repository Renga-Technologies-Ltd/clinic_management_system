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
    key: "register-1",
    path: `${AUTH_PREFIX_PATH}/register-1`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/register-1")
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
  {
    key: "dashboard.analytic",
    path: `${APP_PREFIX_PATH}/dashboards/analytic`,
    component: React.lazy(() => import("views/app-views/dashboards/analytic")),
  },
  {
    key: "dashboard.sales",
    path: `${APP_PREFIX_PATH}/dashboards/sales`,
    component: React.lazy(() => import("views/app-views/dashboards/sales")),
  },
  {
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    component: React.lazy(() => import("views/app-views/apps")),
  },
  {
    key: "apps.mail",
    path: `${APP_PREFIX_PATH}/apps/mail/*`,
    component: React.lazy(() => import("views/app-views/apps/mail")),
  },
  {
    key: "apps.chat",
    path: `${APP_PREFIX_PATH}/apps/chat/*`,
    component: React.lazy(() => import("views/app-views/apps/chat")),
  },
  {
    key: "apps.calendar",
    path: `${APP_PREFIX_PATH}/apps/calendar`,
    component: React.lazy(() => import("views/app-views/apps/calendar")),
  },
  {
    key: "apps.project",
    path: `${APP_PREFIX_PATH}/apps/project`,
    component: React.lazy(() => import("views/app-views/apps/project")),
  },
  {
    key: "apps.project.list",
    path: `${APP_PREFIX_PATH}/apps/project/list`,
    component: React.lazy(() =>
      import("views/app-views/apps/project/project-list/ProjectList")
    ),
  },
  {
    key: "apps.project.scrumboard",
    path: `${APP_PREFIX_PATH}/apps/project/scrumboard`,
    component: React.lazy(() =>
      import("views/app-views/apps/project/scrumboard")
    ),
  },
  {
    key: "apps.ecommerce",
    path: `${APP_PREFIX_PATH}/apps/ecommerce`,
    component: React.lazy(() => import("views/app-views/apps/e-commerce")),
  },
  {
    key: "apps.ecommerce.add-product",
    path: `${APP_PREFIX_PATH}/apps/ecommerce/add-product`,
    component: React.lazy(() =>
      import("views/app-views/apps/e-commerce/add-product")
    ),
  },
  {
    key: "apps.ecommerce.edit-product",
    path: `${APP_PREFIX_PATH}/apps/ecommerce/edit-product/:id`,
    component: React.lazy(() =>
      import("views/app-views/apps/e-commerce/edit-product")
    ),
  },
  {
    key: "apps.ecommerce.product-list",
    path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
    component: React.lazy(() =>
      import("views/app-views/apps/e-commerce/product-list")
    ),
  },
  {
    key: "apps.ecommerce.orders",
    path: `${APP_PREFIX_PATH}/apps/ecommerce/orders`,
    component: React.lazy(() =>
      import("views/app-views/apps/e-commerce/orders")
    ),
  },
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
    component: React.lazy(() =>
      import("views/auth-views/authentication/register-1")
    ),
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
    key: "docs.documentation",
    path: `${APP_PREFIX_PATH}/docs/documentation/*`,
    component: React.lazy(() => import("views/app-views/docs")),
  },
];
