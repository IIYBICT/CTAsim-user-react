import { UserActivateEmail } from "@/api/user";
import { message } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ActivateEmail() {
  const { sjs } = useParams();
  const onActivateEmail = async () => {
    try {
      const res: any = await UserActivateEmail(String(sjs));
      if (res.data.isActivate) {
        message.success("邮箱验证成功,即将跳转到首页");
      } else {
        if (res.message === "已经验证了，无需重复验证") {
          message.error("即将跳转到首页");
        } else {
          message.error(res.message);
        }
      }
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {}
  };
  useEffect(() => {
    onActivateEmail();
  }, []);
  return null;
}

export default ActivateEmail;
