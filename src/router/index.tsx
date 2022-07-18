import { RouteObjectRule } from "./types";

import appRoutes from "./routes";

const routes: RouteObjectRule[] = [
  {
    path: "/",
    page: () => import("@/views/Home"),
    meta: {
      title: "首页",
      redirect: "/dashboard",
    },
  },
  {
    path: "/login",
    page: () => import("@/views/Login"),
    meta: {
      title: "登录",
      auth: false,
    },
  },
  {
    path: "/register",
    page: () => import("@/views/Register"),
    meta: {
      title: "注册",
      auth: false,
    },
  },
  {
    path: "/activate/email/:sjs",
    page: () => import("@/views/client/ActivateEmail"),
    meta: {
      title: "邮箱验证",
      auth: false,
    },
  },
  ...appRoutes,
  {
    path: "/404",
    page: () => import("@/views/errorPage/NotFound"),
    meta: {
      title: "404",
    },
  },
  {
    path: "*",
    page: () => import("@/views/errorPage/NotFound"),
    meta: {
      title: "404",
    },
  },
];

export default routes;
