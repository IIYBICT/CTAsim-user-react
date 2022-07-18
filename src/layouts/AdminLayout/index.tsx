import { Avatar, Drawer, Layout, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SiderMenu from "../components/SiderMenu";
import AppConfig from "@/config/AppConfig";
import FooterComponent from "../components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import WrapperBreadcrumb from "../components/WrapperBreadcrumb";
import routes from "@/router";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserState } from "@/types/user";
import {
  setIsActivateLoading,
  setUserInfo,
  setUserInfoLoading,
} from "@/store/reducer/userReducer";
import LoadingView from "@/utils/LoadingView";
import { getUserInfo } from "@/api/user";
import { GetRailActivityList } from "@/api/railActivity";
import { setRailActivityList } from "@/store/reducer/railActivityReducer";

const { Sider, Content } = Layout;
function AdminLayout() {
  const [collapse, setCollapse] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(0);
  const [rootCollapse, setRootCollapse] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const dispatch: any = useDispatch();
  const UserInfo: UserState = useSelector(
    (state: RootState) => state.user.UserInfo
  );
  const UserInfoLoading: boolean = useSelector(
    (state: RootState) => state.user.UserInfoLoading
  );
  const { confirm } = Modal;
  const IsActivateLoading: boolean = useSelector(
    (state: RootState) => state.user.IsActivateLoading
  );
  const [loading, setloading] = useState(false);
  const onLoading = async () => {
    try {
      if (!UserInfoLoading) {
        const res = await getUserInfo();
        if (res.data.id !== undefined) {
          dispatch(setUserInfo(res.data));
          dispatch(setUserInfoLoading(true));
        }
      }
      setloading(true);
    } catch (error) {}
  };
  useEffect(() => {
    onLoading();
  }, []);
  // useEffect(() => {
  //   if (!IsActivateLoading) {
  //     if (!UserInfo.IsActivate) {
  //       showConfirm();
  //     }
  //   }
  // }, [IsActivateLoading]);

  // const showConfirm = () => {
  //   confirm({
  //     title: "系统提示",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "邮箱未验证，请前往邮箱验证",
  //     okText: "好的",
  //     cancelText: "取消",
  //     onOk() {
  //       dispatch(setIsActivateLoading(true));
  //     },
  //     onCancel() {
  //       console.log("Cancel");
  //     },
  //   });
  // };
  return (
    <LoadingView loading={loading}>
      <Layout className=" h-screen">
        <Sider
          breakpoint="lg"
          collapsedWidth={collapsedWidth}
          trigger={null}
          width={250}
          collapsed={collapse}
          className="shadow-md"
          style={{ background: "#fff" }}
          onBreakpoint={(broken) => {
            if (broken) {
              setRootCollapse(true);
              setCollapsedWidth(0);
              setCollapse(true);
            } else {
              setRootCollapse(false);
              setCollapsedWidth(80);
              setCollapse(false);
            }
          }}
        >
          <div className="h-16 flex justify-center items-center">
            {collapse ? (
              !rootCollapse ? (
                <span className=" text-lg font-bold">CTAsim</span>
              ) : (
                ""
              )
            ) : !rootCollapse || !collapse ? (
              <span className=" text-lg font-bold">{AppConfig.AppName}</span>
            ) : (
              ""
            )}
          </div>
          <SiderMenu
            collapse={collapse}
            rootCollapse={rootCollapse}
            setCollapse={setCollapse}
          />
        </Sider>
        <Layout>
          {/* 头部 */}
          <HeaderComponent
            collapse={collapse}
            rootCollapse={rootCollapse}
            setDrawerVisible={setDrawerVisible}
            setRootCollapse={setRootCollapse}
            setCollapse={setCollapse}
            drawerVisible={drawerVisible}
          />
          <Content className="overflow-auto">
            <Outlet />
          </Content>
          {/* <Content className="h-full">
          <Outlet />
        </Content> */}
          {/* <FooterComponent /> */}
        </Layout>
      </Layout>
    </LoadingView>
  );
}

export default AdminLayout;
