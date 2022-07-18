import React, { Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import {
  FunctionRule,
  GuardRule,
  MetaRule,
  onRouteBeforeRule,
  RouteObjectRule,
} from "../types";

let onRouterBefore: onRouteBeforeRule;
let RouterLoading: FunctionRule;

//路由导航，设置redirect重定向 和 auth权限
function Guard({ element, meta }: any) {
  const { pathname } = useLocation();
  const nextPath = onRouterBefore ? onRouterBefore(meta, pathname) : pathname;
  if (nextPath && nextPath !== pathname) {
    element = <Navigate to={nextPath} replace={true} />;
  }
  return element;
}

// 路由懒加载
function lazyLoadRouters(page: FunctionRule, meta: MetaRule) {
  meta = meta || {};
  const LazyElement = React.lazy(page);
  const GetElement = () => {
    return (
      <Suspense fallback={<RouterLoading />}>
        <LazyElement />
      </Suspense>
    );
  };
  return <Guard element={<GetElement />} meta={meta} />;
}

function transRoutes(routes: RouteObjectRule[]) {
  const list: any[] = [];
  routes.forEach((route) => {
    const obj = { ...route };
    if (obj.page) {
      obj.element = lazyLoadRouters(obj.page, obj.meta as MetaRule);
    }
    if (obj.children) {
      obj.children = transRoutes(obj.children);
    }
    list.push(obj);
  });
  return list;
}
type LoadingEleRule = React.ReactNode;

export type {
  RouteObjectRule,
  MetaRule,
  FunctionRule,
  onRouteBeforeRule,
  LoadingEleRule,
};

function RouterGuard(params: GuardRule) {
  onRouterBefore = params.onRouterBefore;
  RouterLoading = () => params.loading || <></>;
  return useRoutes(transRoutes(params.routers));
}

export default RouterGuard;
