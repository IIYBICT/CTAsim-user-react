import { getUserInfo, login, LoginData } from "@/api/user";
import AppConfig from "@/config/AppConfig";
import { GetUserInfoAsync } from "@/store/reducer/userReducer/userAsync";
import { setToken, setUserId } from "@/utils/auth";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";

function Login() {
  // const dispatch: any = useDispatch();
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (FormData: LoginData) => {
    setLoginLoading(true);
    try {
      const res = await login(FormData);
      if (res.data.token) {
        setToken(res.data.token);
        // dispatch(GetUserInfoAsync());
        message.success("登录成功");
        navigate("/dashboard");
      }
      setLoginLoading(false);
    } catch (error) {
      setLoginLoading(false);
    }
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
              登录 - {AppConfig.AppName}
            </span>
          </div>
          {/* 表单 */}
          <Form
            name="login"
            initialValues={{
              remember: true,
              call: "",
              password: "",
            }}
            layout={"vertical"}
            onFinish={onFinish}
          >
            <Form.Item
              name="call"
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
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox defaultChecked={false} onChange={(e) => {}}>
                  记住密码
                </Checkbox>
              </Form.Item>

              <a className="float-right" href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                loading={loginLoading}
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                登录
              </Button>
              <span>
                没有账号{" "}
                <a
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  前往注册！
                </a>
              </span>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Login;
