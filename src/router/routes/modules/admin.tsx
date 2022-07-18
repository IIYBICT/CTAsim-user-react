import AdminLayout from "@/layouts/AdminLayout";
import { RouteObjectRule } from "@/router/types";
import { HomeOutlined } from "@ant-design/icons";
// import { AdminLayout } from "@/router/constance";

const client: RouteObjectRule = {
  path: "/admin",
  page: () => import("@/layouts/AdminLayout"),
  //   element: <AdminLayout />,
  meta: {
    auth: true,
    title: "管理员中心",
    redirect: "/admin/user/list",
    roles: [0, 1],
  },
  children: [
    {
      path: "/admin/user/list",
      page: () => import("@/views/admin/UserList"),
      meta: {
        title: "用户管理",
        auth: true,
        roles: [0, 1],
      },
    },
    {
      path: "/admin/user/update/:userId",
      page: () => import("@/views/admin/UpdateUserInfo"),
      meta: {
        title: "修改用户信息",
        auth: true,
        roles: [0, 1],
      },
    },
  ],
};

export default client;
