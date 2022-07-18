import routes from "@/router";
import { RouteObjectRule } from "@/router/types";
import { Breadcrumb } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function WrapperBreadcrumb() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbNameMap: Record<string, string> = {};

  const getBreadcrumb = (route: RouteObjectRule) => {
    if (route.children?.length === 1) {
      //   getBreadcrumb(route.children[0]);
      breadcrumbNameMap[route.path as string] = String(
        route.children[0].meta?.title
      );
    } else {
      breadcrumbNameMap[route.path as string] = String(route.meta?.title);
      if (route.children) {
        route.children.forEach((childRoute: RouteObjectRule) => {
          getBreadcrumb(childRoute);
        });
      }
    }
  };

  const getBreadcrumbList = (routeList: RouteObjectRule[]) => {
    routeList.map((item: RouteObjectRule) => {
      getBreadcrumb(item);
    });
  };

  getBreadcrumbList(routes);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home"></Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}

export default WrapperBreadcrumb;
