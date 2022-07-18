import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";
import { store } from "@/store";
import "@/styles/tailwind.css";
import "@/styles/index.less";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import locale from "antd/es/locale/zh_CN";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);
