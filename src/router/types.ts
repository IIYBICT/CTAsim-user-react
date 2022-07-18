import { type } from "os";
import React from "react";
import { RouteObject } from "react-router-dom";

export interface FunctionRule {
  (): any;
}

export type IRole = 0 | 1 | 2 | 3 | 4 | 5;

export interface MetaRule {
  auth?: boolean; //是否需要登录验证
  title: string; //页面title
  roles?: IRole[]; //页面权限
  redirect?: string;
}

export interface RouteObjectRule extends RouteObject {
  children?: RouteObjectRule[]; //子路由
  page?: FunctionRule; //route导入页面的对象
  path?: string; //页面路径
  meta?: MetaRule; //页面参数
}

export interface onRouteBeforeRule<meta = MetaRule, to = string> {
  (meta: meta, to: to): any | never;
}

export type LoadingEleRule = React.ReactNode;

export interface GuardRule {
  routers: RouteObjectRule[];
  onRouterBefore: onRouteBeforeRule;
  loading?: LoadingEleRule;
}
