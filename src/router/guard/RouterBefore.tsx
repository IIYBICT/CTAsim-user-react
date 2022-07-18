import AppConfig from "@/config/AppConfig";
import { RootState } from "@/store";
import { GetRailActivityListAsync } from "@/store/reducer/railActivityReducer/railActivityAsync";
import { GetUserInfoAsync } from "@/store/reducer/userReducer/userAsync";
import { UserState } from "@/types/user";
import { getToken } from "@/utils/auth";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IRole, onRouteBeforeRule } from "../types";
/**
 * 路由守卫
 * @param meta
 * @param to
 * @returns
 */
export const onRouteBefore: onRouteBeforeRule = (meta, to) => {
  const { auth, title, roles } = meta;
  const dispatch: any = useDispatch();
  if (title) {
    // 动态修改页面title
    document.title = title + " - " + AppConfig.AppName || AppConfig.AppName;
  }

  if (auth) {
    if (!getToken()) {
      message.error("账号未登录或Token已过期");
      return "/login";
    }
    const UserInfo: UserState = useSelector(
      (state: RootState) => state.user.UserInfo
    );
    const UserInfoLoading = useSelector(
      (state: RootState) => state.user.UserInfoLoading
    );
    if (!UserInfoLoading) {
      // dispatch(GetUserInfoAsync());
      // dispatch(GetRailActivityListAsync());
      // dispatch(GetSignRailActivityListAsync());
      // dispatch(GetRailInfoAsync());
    }
    if (roles?.includes(UserInfo.groupId as IRole) || roles === undefined) {
      return to;
    } else {
      return "/dashboard";
    }
  }
  return to;
};
