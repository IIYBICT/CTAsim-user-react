import { RouteObjectRule } from "@/router/types";

const rail: RouteObjectRule = {
  path: "/rail",
  page: () => import("@/layouts/AdminLayout"),
  meta: {
    auth: true,
    title: "铁路联控中心",
    redirect: "/rail/info",
  },
  children: [
    {
      path: "/rail/info",
      page: () => import("@/views/rail/railInfo"),
      meta: {
        title: "联控信息",
        auth: true,
        roles: [0, 1, 2, 3, 4, 5],
      },
    },
    {
      path: "/rail/activity",
      page: () => import("@/views/rail/railActivity"),
      meta: {
        title: "联控活动",
        auth: true,
        roles: [0, 1, 2, 3, 4, 5],
      },
    },
    {
      path: "/rail/activity/info/:id",
      page: () => import("@/views/rail/railAcyivityInfo"),
      meta: {
        title: "联控活动详情",
        auth: true,
        roles: [0, 1, 2, 3, 4, 5],
      },
    },
    {
      path: "/rail/activity/add",
      page: () => import("@/views/rail/addOrUpdateRailActivity"),
      meta: {
        title: "添加活动",
        auth: true,
        roles: [0, 1],
      },
    },
    {
      path: "/rail/activity/update/:id",
      page: () => import("@/views/rail/addOrUpdateRailActivity"),
      meta: {
        title: "修改活动信息",
        auth: true,
        roles: [0, 1],
      },
    },
    {
      path: "/rail/activity/sign/:id",
      page: () => import("@/views/rail/signRailActivity"),
      meta: {
        title: "活动报名",
        auth: true,
        roles: [0, 1, 2, 3, 4, 5],
      },
    },
  ],
};

export default rail;
