import { useEffect } from "react";
import RouterGuard from "@/router/guard/RouterGuard";
import routes from "@/router";
import { onRouteBefore } from "./router/guard/RouterBefore";
import Loading from "./components/Loading";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import LoadingView from "./utils/LoadingView";
import { useDispatch, useSelector } from "react-redux";
import { GetUserInfoAsync } from "./store/reducer/userReducer/userAsync";
import {
  GetRailActivityListAsync,
  GetSignRailActivityListAsync,
} from "./store/reducer/railActivityReducer/railActivityAsync";
import { GetRailInfoAsync } from "./store/reducer/railReducer/railAsync";
import { RootState } from "./store";
import { getToken } from "./utils/auth";
import { message } from "antd";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const routeList: any = matchRoutes(routes, pathname);
    const route = routeList[routeList.length - 1].route;
    if (route.meta?.redirect) {
      navigate(route.meta.redirect);
    }
  }, [pathname]);

  return (
    <RouterGuard
      routers={routes}
      onRouterBefore={onRouteBefore}
      loading={<LoadingView loading={true} />}
    ></RouterGuard>
  );
}

export default App;
