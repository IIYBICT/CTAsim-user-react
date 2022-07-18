import AdminLayout from "@/layouts/AdminLayout";
import { RouteObjectRule } from "@/router/types";
import { HomeOutlined } from "@ant-design/icons";
// import { AdminLayout } from "@/router/constance";

const dashboard: RouteObjectRule = {
  path: "/dashboard",
  page: () => import("@/layouts/AdminLayout"),
  // element: <AdminLayout />,
  meta: {
    auth: true,
    title: "控制台",
    redirect: "/dashboard",
  },
  children: [
    {
      path: "/dashboard",
      page: () => import("@/views/dashboard"),
      meta: {
        title: "工作台",
        auth: true,
        roles: [0, 1, 2, 3, 4, 5],
      },
    },
  ],
};

export default dashboard;
