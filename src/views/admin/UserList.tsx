import { AdminGetUserInfo, GetUserList } from "@/api/admin";
import { UserState } from "@/types/user";
import LoadingView from "@/utils/LoadingView";
import {
  Card,
  Col,
  PageHeader,
  Row,
  Space,
  Statistic,
  Table,
  TableProps,
  Tabs,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();
  const [userList, setUserList] = React.useState<UserState[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [userListSize, setUserListSize] = React.useState<number>(0);
  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "ascend",
    },
    {
      title: "呼号",
      dataIndex: "userCall",
      width: 200,
      key: "userCall",
    },
    {
      title: "用户名",
      dataIndex: "username",
      width: 200,
      key: "username",
    },
    {
      title: "用户组名称",
      dataIndex: "groupName",
      width: 200,
      key: "groupName",
    },
    {
      title: "邮箱地址",
      dataIndex: "email",
      width: 200,
      key: "email",
    },
    {
      title: "QQ",
      dataIndex: "qq",
      width: 200,
      key: "qq",
    },
    {
      title: "连飞服务器等级",
      dataIndex: "ratingName",
      width: 200,
      key: "ratingName",
      render: (_: any, { ratingId, ratingName }: any) => {
        return ratingId === null ? "未激活" : ratingName;
      },
    },
    {
      title: "邮箱注册状态",
      dataIndex: "isActivate",
      width: 200,
      key: "isActivate",
      render: (_: any, { isActivate }: any) => {
        return isActivate ? "已验证" : "未验证";
      },
    },
    {
      title: "注册时间",
      dataIndex: "registerTime",
      width: 200,
      key: "registerTime",
    },
    {
      title: "最后登录时间",
      dataIndex: "lastLoginTime",
      width: 200,
      key: "lastLoginTime",
      sortDirections: ["descend", "ascend"],
      render: (_: any, { lastLoginTime }: any) => {
        return lastLoginTime ? lastLoginTime : "未登陆过";
      },
    },
    {
      title: "操作",
      key: "action",
      width: 200,
      render: (_: any, data: any) => (
        <Space size="middle">
          <a
            onClick={() => {
              navigate("/admin/user/update/" + data.id);
            }}
          >
            管理
          </a>
        </Space>
      ),
    },
  ];
  const onLoading = async () => {
    try {
      const res = await GetUserList();
      setUserList(res.data.data);
      setUserListSize(res.data.size);
      setLoading(true);
    } catch (error) {}
  };
  if (!loading) {
    onLoading();
  }
  useEffect(() => {});
  return (
    <LoadingView loading={loading}>
      <PageHeader
        ghost={false}
        title={"用户管理"}
        // extra={}
      >
        <Row gutter={20}>
          <Col>
            <Tooltip title="已注册拥有用户">
              <Statistic title="已注册用户" suffix="位" value={userListSize} />
            </Tooltip>
          </Col>
        </Row>
      </PageHeader>
      <div className=" mt-5 mx-4">
        <Card>
          <Tabs>
            <Tabs.TabPane tab="用户列表" key="1">
              <Table
                dataSource={userList}
                scroll={{ x: true }}
                columns={columns}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="更换邮箱申请" key="2">
              暂未开放，可手动修改邮箱后用户进行验证
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </LoadingView>
  );
}

export default UserList;
