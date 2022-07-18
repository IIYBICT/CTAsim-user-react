import routes from "@/router";
import { RouteObjectRule } from "../types";

//根据路径获取路由
const checkAuth: any = (routers: Array<RouteObjectRule>, path: string) => {
  for (const data of routers) {
    if (data.path === path) return data;
    if (data.children) {
      const res = checkAuth(data.children, path);
      if (res) return res;
    }
  }
  return null;
};

// 单独的页面需要设置权限等， 根据路径，获取路由的详情
const checkRouterAuth = (path: string) => checkAuth(routes, path);

export { checkAuth, checkRouterAuth };
