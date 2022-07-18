import {
  AppstoreOutlined,
  BuildOutlined,
  DotChartOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

export interface SiderMenuListType {
  path: string;
  name: string;
  label?: React.ReactNode;
  type?: "link" | "group";
  icon?: React.ReactNode;
  children?: SiderMenuListType[];
}

export const SiderMenuList: SiderMenuListType[] = [
  {
    path: "/dashboard",
    name: "工作台",
    icon: <HomeOutlined />,
  },
  {
    path: "/rail",
    name: "铁路联控中心",
    icon: <BuildOutlined />,
    children: [
      {
        path: "/rail/info",
        name: "联控信息",
        icon: <InfoCircleOutlined />,
      },
      {
        path: "/rail/activity",
        name: "联控活动",
        icon: <DotChartOutlined />,
      },
    ],
  },
  {
    path: "/admin",
    name: "管理员中心",
    icon: <BuildOutlined />,
    children: [
      {
        path: "/admin/user/list",
        name: "用户管理",
        icon: <UserSwitchOutlined />,
      },
    ],
  },
  {
    path: "http://map.ctasim.top/",
    name: "连飞地图",
    type: "link",
    icon: <HomeOutlined />,
  },
];
