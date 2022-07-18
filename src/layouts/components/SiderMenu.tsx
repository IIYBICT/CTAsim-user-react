import { SiderMenuList, SiderMenuListType } from "@/config/SiderMenuList";
import routes from "@/router";
import { checkAuth } from "@/router/guard/RouterUtils";
import { IRole, RouteObjectRule } from "@/router/types";
import { RootState } from "@/store";
import { Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  title?: ""
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    title,
  } as MenuItem;
}

function SiderMenu({ setCollapse, rootCollapse, collapse }: any) {
  const items: MenuProps["items"] = [];
  const getMenu: any = (item: SiderMenuListType) => {
    const UserInfo = useSelector((state: RootState) => state.user.UserInfo);
    const groupId = UserInfo.groupId || 3;
    const route: RouteObjectRule = checkAuth(routes, item.path);
    if (item.type === "link") {
      return getItem(
        <a href={item.path} target="_blank">
          {item.name}
        </a>,
        item.path,
        item.icon
      );
    } else {
      if (route.meta?.roles) {
        if (route.meta.roles.includes(groupId as IRole)) {
          if (item.children) {
            return getItem(
              item.name,
              item.path,
              item.icon,
              item.children.map((child) => getMenu(child))
            );
          } else {
            return getItem(item.name, item.path, item.icon);
          }
        }
      } else {
        if (item.children) {
          return getItem(
            item.name,
            item.path,
            item.icon,
            item.children.map((child) => getMenu(child))
          );
        } else {
          return getItem(item.name, item.path, item.icon);
        }
      }
    }
  };

  const MenuList = (routeList: SiderMenuListType[]) => {
    routeList.map((item: SiderMenuListType) => {
      items.push(getMenu(item));
    });
  };
  MenuList(SiderMenuList);

  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    if (!e.key.includes("http://") && !e.key.includes("https://")) {
      navigate(e.key);
    }
    if (rootCollapse) {
      setCollapse(true);
    }
  };

  const selectedKeys: string[] = [];
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const { pathname } = useLocation();

  useEffect(() => {
    selectedKeys.push(pathname);
  }, [pathname]);

  useEffect(() => {
    setOpenKeys(["/" + pathname.split("/")[1]]);
  }, [collapse]);

  const rootSubmenuKeys: string[] = [];
  function rootOpenKeys() {
    routes.map((item: RouteObjectRule) => {
      rootSubmenuKeys.push(item.path as string);
    });
  }

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    rootOpenKeys();
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <>
      <Menu
        theme="light"
        onClick={onClick}
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        style={{ width: "100%" }}
        // inlineCollapsed={collapse}
        items={items}
      />
      {/* <Menu
        defaultSelectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapse}
        items={items}
      /> */}
    </>
  );
}

export default SiderMenu;
