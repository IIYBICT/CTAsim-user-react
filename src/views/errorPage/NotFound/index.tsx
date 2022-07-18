import MyNavigate from "@/utils/MyNavigate";
import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="flex justify-center items-center"
      >
        <Result
          status="404"
          title="404"
          subTitle="对不起，您访问的页面不存在。"
          extra={
            <Button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              type="primary"
            >
              返回首页
            </Button>
          }
        />
      </div>
    </>
  );
}

export default NotFound;
