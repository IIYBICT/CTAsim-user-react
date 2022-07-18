import AdminLayout from "@/layouts/AdminLayout";
import { RouteObjectRule } from "@/router/types";
import { HomeOutlined } from "@ant-design/icons";
// import { AdminLayout } from "@/router/constance";

const client: RouteObjectRule = {
  path: "/",
  page: () => import("@/layouts/AdminLayout"),
  //   element: <AdminLayout />,
  meta: {
    auth: true,
    title: "控制台",
    redirect: "/dashboard",
  },
  children: [
    {
      path: "/user/info",
      page: () => import("@/views/client/UserInfo"),
      meta: {
        title: "个人信息",
        auth: true,
      },
    },
  ],
};

export default client;
