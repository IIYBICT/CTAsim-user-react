import { sendActivateEmail, UserActivateCall } from "@/api/user";
import RatingTagView from "@/components/RatingTagView";
import { RootState } from "@/store";
import { MailOutlined, QqOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  message,
  Row,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const UserInfo = useSelector((state: RootState) => state.user.UserInfo);
  const onActivateCall = async (e: any) => {
    console.log(e);

    try {
      const res = await UserActivateCall(e.password);
      console.log(res);

      if (res.data.isActivate) {
        message.success("激活成功");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {}
  };
  return (
    <>
      <div className=" mx-4 mt-5">
        <Row gutter={10}>
          <Col xs={24} sm={24} md={24} lg={24} xl={8}>
            <Card>
              <div className="flex justify-center items-center">
                <Avatar
                  size={100}
                  style={{
                    backgroundColor: "#35cdca",
                    verticalAlign: "middle",
                    fontSize: "40px",
                  }}
                >
                  {UserInfo.username.substring(0, 1)}
                </Avatar>
              </div>
              <div className=" flex justify-center text-xl font-bold mt-3">
                {UserInfo.username}
              </div>
              <div className=" flex justify-center text-xl font-bold mt-3">
                {UserInfo.groupId === 1 ? (
                  <Tag color="#A0529F">超级管理员</Tag>
                ) : (
                  ""
                )}
                {UserInfo.groupId === 2 ? (
                  <Tag color="#747ACE">管理员</Tag>
                ) : (
                  ""
                )}
                {UserInfo.groupId === 3 ? (
                  <Tag color="#35cdca">普通用户</Tag>
                ) : (
                  ""
                )}
                {UserInfo.groupId === 4 ? (
                  <Tag color="warning">封禁账号</Tag>
                ) : (
                  ""
                )}
                {UserInfo.groupId === 0 ? <Tag>未激活</Tag> : ""}
              </div>
              <div className=" mt-10">
                <List itemLayout="horizontal">
                  <List.Item actions={[UserInfo.userCall]}>
                    <List.Item.Meta title="连飞呼号" />
                  </List.Item>
                  <List.Item actions={[<RatingTagView UserInfo={UserInfo} />]}>
                    <List.Item.Meta title="连飞服务器等级" />
                  </List.Item>
                  <List.Item actions={[UserInfo.email]}>
                    <List.Item.Meta title="邮箱账号" />
                  </List.Item>
                  <List.Item actions={[UserInfo.qq]}>
                    <List.Item.Meta title="QQ" />
                  </List.Item>
                  <List.Item actions={[String(UserInfo.registerTime)]}>
                    <List.Item.Meta title="注册时间" />
                  </List.Item>
                  <List.Item actions={[String(UserInfo.lastLoginTime)]}>
                    <List.Item.Meta title="最后登录时间" />
                  </List.Item>
                </List>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={16}>
            <Card>
              <Tabs defaultActiveKey="1">
                {/* <Tabs.TabPane tab="修改信息" key="1">
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="vertical"
                    initialValues={{
                      remember: true,
                      email: UserInfo.email,
                      qq: UserInfo.qq,
                    }}
                    // initialValues={{ size: componentSize }}
                    // onValuesChange={onFormLayoutChange}
                  >
                    <Form.Item
                      name="email"
                      label="邮箱地址"
                      rules={[{ required: true, message: "请输入邮箱地址!" }]}
                    >
                      <Input
                        prefix={<MailOutlined />}
                        placeholder="请输入邮箱地址"
                      />
                    </Form.Item>
                    <Form.Item
                      name="qq"
                      label="QQ"
                      rules={[{ required: true, message: "请输入QQ!" }]}
                    >
                      <Input prefix={<QqOutlined />} placeholder="请输入QQ" />
                    </Form.Item>
                  </Form>
                </Tabs.TabPane> */}
                <Tabs.TabPane tab="邮箱激活" key="2">
                  <div>
                    <div>当前邮箱：{UserInfo.email}</div>
                    <div>
                      验证状态：{UserInfo.IsActivate ? "已激活" : "未激活"}
                    </div>
                  </div>
                  {!UserInfo.IsActivate ? (
                    <>
                      {/* <Input value={UserInfo.email} disabled /> */}
                      <Button
                        onClick={() => {
                          sendActivateEmail()
                            .then((res: any) => {
                              if (res.data.isSend) {
                                message.success("发送成功");
                                // setTimeout(() => {
                                //   window.location.reload();
                                // }, 1000);
                              }
                            })
                            .catch((error) => {});
                        }}
                      >
                        重新发送激活邮件
                      </Button>
                    </>
                  ) : (
                    <Tooltip title="您已激活该邮箱，无需重复操作，如需更换邮箱，请联系管理员">
                      <Button disabled>重新发送激活邮件</Button>
                    </Tooltip>
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="连飞呼号激活" key="3">
                  {!UserInfo.IsCallActivate ? (
                    <>
                      <Form layout="vertical" onFinish={onActivateCall}>
                        <Form.Item
                          label="连飞服务器密码"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "请输入连飞服务器密码！",
                            },
                          ]}
                        >
                          <Input placeholder="请输入连飞服务器密码" />
                        </Form.Item>
                        <Form.Item>
                          <Button htmlType="submit">激活连飞呼号</Button>
                        </Form.Item>
                      </Form>
                    </>
                  ) : (
                    "已激活，无需操作"
                  )}
                </Tabs.TabPane>
                <Tabs.TabPane tab="密码修改" key="4">
                  暂未开放
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserInfo;
