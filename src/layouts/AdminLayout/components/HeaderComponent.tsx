import { RootState } from "@/store";
import { logoutAsync } from "@/store/reducer/userReducer/userAsync";
import { clearAll } from "@/utils/auth";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Dropdown, Menu, Select } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import routes from "@/router";
import { RouteObjectRule } from "@/router/types";
import Marquee from "react-fast-marquee";

function HeaderComponent({
  collapse,
  rootCollapse,
  setDrawerVisible,
  setRootCollapse,
  setCollapse,
  drawerVisible,
}: any) {
  const UserInfo = useSelector((state: RootState) => state.user.UserInfo);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const routeList: any = matchRoutes(routes, pathname);
  const route: RouteObjectRule = routeList[routeList.length - 1].route;
  const title = route.meta?.title;
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              onClick={() => {
                navigate("/user/info");
              }}
            >
              个人信息
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              onClick={() => {
                dispatch(logoutAsync());
                navigate("/");
              }}
            >
              返回首页
            </a>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "3",
          label: (
            <a
              onClick={() => {
                dispatch(logoutAsync());
                clearAll();
                window.location.href = "/login";
              }}
            >
              退出登录
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <Header
      className="h-16 shadow-md"
      style={{
        background: "#fff",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div className="float-left flex items-center">
        {collapse ? (
          <MenuUnfoldOutlined
            style={{ fontSize: "16px" }}
            onClick={() => {
              setCollapse(!collapse);
              // if (rootCollapse) {
              //   setDrawerVisible(!drawerVisible);
              // } else {
              //   setCollapse(!collapse);
              // }
            }}
          />
        ) : (
          <MenuFoldOutlined
            style={{ fontSize: "16px" }}
            onClick={() => {
              setCollapse(!collapse);
              // if (rootCollapse) {
              //   setDrawerVisible(!drawerVisible);
              // } else {
              //   setCollapse(!collapse);
              // }
            }}
          />
        )}
        <span className="ml-3">{title}</span>
      </div>
      <div className="float-right">
        <div className="float-right">
          <Dropdown
            placement="bottomRight"
            overlay={menu}
            // onClick={() => enterLoading(1)}
          >
            <a onClick={(e) => e.preventDefault()}>
              {/* <div className="pr-4">{UserInfo.name}</div> */}
              <Avatar
                size="large"
                style={{ backgroundColor: "#35cdca", verticalAlign: "middle" }}
                // icon={
                //   <img src="https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png" />
                // }
              >
                {UserInfo.username.substring(0, 1)}
              </Avatar>
            </a>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}

export default HeaderComponent;
