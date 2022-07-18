import AppConfig from "@/config/AppConfig";
import { Footer } from "antd/lib/layout/layout";
import React from "react";

function FooterComponent() {
  return (
    <Footer style={{ textAlign: "center" }}>{AppConfig.AppName} ©2022</Footer>
  );
}

export default FooterComponent;
