import { GetCert, register } from "@/api/user";
import AppConfig from "@/config/AppConfig";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  QqOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, FormInstance, Input, message } from "antd";
import { ValidateStatus } from "antd/lib/form/FormItem";
import React, { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const validatePrimeCall = (
  call: any
): {
  validateStatus: ValidateStatus;
  errorMsg: string | null;
} => {
  if (call.target.value.length !== 4) {
    return {
      validateStatus: "error",
      errorMsg: "呼号必须为4位数字!",
    };
  }
  if (/^\d+$/.test(call.target.value) === false) {
    return {
      validateStatus: "error",
      errorMsg: "呼号必须为数字!",
    };
  }
  return {
    validateStatus: "success",
    errorMsg: null,
  };
};

function Register() {
  const [registerLoading, setRegisterLoading] = useState(false);
  const formRef = React.createRef<FormInstance>();
  const navigate = useNavigate();

  const [call, setCall] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({
    value: "",
  });

  const onFinish = (values: {
    call: string;
    email: string;
    username: string;
    password: string;
    qq: string;
  }) => {
    if (values.call.length !== 4) {
      message.error("呼号必须是4位数字");
    } else {
      if (
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
          values.email
        ) === false
      ) {
        message.error("邮箱格式不正确");
      } else {
        register({
          call: values.call,
          email: values.email,
          username: values.username,
          password: values.password,
          qq: values.qq,
        })
          .then((res) => {
            console.log(res);
            if (res.data.isRegister) {
              message.success("注册成功");
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
            }
          })
          .catch((err) => {});
      }
    }
  };
  const GetCall = async () => {
    try {
      const res = await GetCert();
      formRef.current?.setFieldsValue({
        call: res.data.call,
        ...formRef,
      });
    } catch (error) {}
  };

  const onCallChange: any = (value: string) => {
    setCall({
      ...validatePrimeCall(value),
      value,
    });
  };

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ height: "100vh" }}
      >
        <Card bodyStyle={{ padding: "10px" }}>
          {/* 标题 */}
          <div
            className="flex justify-center items-center"
            style={{ width: "300px", padding: "10px" }}
          >
            <span className="text-lg font-bold">
              注册 - {AppConfig.AppName}
            </span>
          </div>
          {/* 表单 */}
          <Form
            ref={formRef}
            name="register"
            layout={"vertical"}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="call"
              label="呼号"
              validateStatus={call.validateStatus}
              help={call.errorMsg}
              rules={[{ required: true, message: "请输入呼号!" }]}
            >
              <Input
                addonAfter={
                  <Button
                    onClick={() => {
                      GetCall();
                    }}
                    type="link"
                  >
                    获取随机呼号
                  </Button>
                }
                value={call.value}
                onChange={onCallChange}
                prefix={<PhoneOutlined />}
                placeholder="请输入呼号"
              />
            </Form.Item>
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: "请输入用户名!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱地址"
              rules={[{ required: true, message: "请输入邮箱地址!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱地址" />
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: "请输入密码！" }]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              name="qq"
              label="QQ"
              rules={[{ required: true, message: "请输入QQ！" }]}
            >
              <Input prefix={<QqOutlined />} placeholder="请输入QQ" />
            </Form.Item>

            <Form.Item>
              <Button
                loading={registerLoading}
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                立即注册
              </Button>
              <span>
                已有账号{" "}
                <a
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  前往登录！
                </a>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Register;
