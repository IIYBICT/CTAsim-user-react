import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

function LoadingView(props: any) {
  return (
    <>
      {props.loading ? (
        <div>{props.children}</div>
      ) : (
        <div
          style={{
            margin: "0",
            height: "100vh",
            marginBottom: "0",
            padding: "30px 50px",
            background: "rgba(0, 0, 0, 0.05)",
          }}
          className=" flex justify-center items-center"
        >
          <Spin
            tip="正在加载中..."
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          />
        </div>
      )}
    </>
  );
}

export default LoadingView;
