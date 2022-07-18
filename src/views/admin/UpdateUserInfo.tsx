import {
  AdminGetRatingList,
  AdminGetUserInfo,
  AdminGetUserList,
  AdminUpdateUserInfo,
} from "@/api/admin";
import { UserState } from "@/types/user";
import LoadingView from "@/utils/LoadingView";
import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateUserInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserState>();
  const [groupList, setGroupList] = useState<
    {
      id: number;
      groupName: string;
      isAdmin: number;
    }[]
  >([]);
  const [ratingList, setRatingList] = useState<
    {
      id: number;
      name: string;
      nameEn: string;
    }[]
  >([]);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [GroupListLoading, setGroupListLoading] = useState(false);
  const [RatingListLoading, setRatingListLoading] = useState(false);
  const GetInfo = async (userId: string) => {
    try {
      const res = await AdminGetUserInfo(userId);
      if (res.data.id === undefined) {
        message.error("用户不存在");
        setTimeout(() => {
          navigate("/admin/user/list");
        }, 1000);
      } else {
        setUserInfo(res.data);
        setUserInfoLoading(true);
        GetGroupList();
        GetRatingList();
      }
    } catch (error) {}
  };
  const GetGroupList = async () => {
    try {
      const GroupListRes = await AdminGetUserList();
      console.log(GroupListRes);

      setGroupList(GroupListRes.data.data);
      setGroupListLoading(true);
    } catch (error) {}
  };
  const GetRatingList = async () => {
    try {
      const RatingListRes = await AdminGetRatingList();
      console.log(RatingListRes);

      setRatingList(RatingListRes.data.data);
      setRatingListLoading(true);
    } catch (error) {}
  };
  useEffect(() => {
    GetInfo(String(params.userId));
  }, []);
  useEffect(() => {
    console.log(userInfo);

    // console.log("groupList", groupList);
  }, [userInfo]);
  const onFinish = async (e: {
    userId: string;
    userCall: string;
    username: string;
    groupId: string;
    email: string;
    qq: string;
  }) => {
    try {
      const res = await AdminUpdateUserInfo({
        ...e,
        userId: String(params.userId),
      });
      if (res.data.isUpdate) {
        message.success("修改成功");
        navigate("/admin/user/list");
      }
    } catch (error) {}
  };
  return (
    <>
      <LoadingView
        loading={userInfoLoading && GroupListLoading && RatingListLoading}
      >
        <div
          className="flex justify-center items-center my-10"
          // style={{ height: "100vh" }}
        >
          <div>
            <div
              className="flex justify-center items-center"
              style={{ width: "350px", padding: "10px" }}
            >
              <span className="text-lg font-bold">修改用户信息</span>
            </div>
            <Form
              // name="basic"
              layout="vertical"
              className="w-full"
              initialValues={userInfo}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名!" }]}
                help="Tip:用户名是用户的唯一标识，不可修改"
              >
                <Input disabled value={userInfo?.username} />
              </Form.Item>
              <Form.Item
                label="连飞呼号"
                name="userCall"
                rules={[{ required: true, message: "请输入连飞呼号!" }]}
                help="Tip:连飞呼号是用户的唯一标识，不可修改"
              >
                <Input disabled value={userInfo?.userCall} />
              </Form.Item>
              <Form.Item
                label="邮箱地址"
                name="email"
                rules={[{ required: true, message: "请输入邮箱地址!" }]}
                help="Tip:邮箱地址修改后需要重新验证"
              >
                <Input value={userInfo?.email} />
              </Form.Item>
              <Form.Item
                label="QQ"
                name="qq"
                rules={[{ required: true, message: "请输入QQ!" }]}
              >
                <Input value={userInfo?.qq} />
              </Form.Item>
              <Form.Item
                label="用户组"
                name="groupId"
                rules={[{ required: true, message: "请选择用户组" }]}
              >
                <Select placeholder="选择用户组">
                  {groupList.map((data: any) => {
                    return (
                      <Select.Option key={data.id} value={data.id}>
                        {data.groupName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="连飞服务器等级"
                name="ratingId"
                rules={[{ required: true, message: "请选择连飞服务器等级" }]}
              >
                <Select placeholder="选择用户组">
                  {ratingList.map((data: any) => {
                    return (
                      <Select.Option key={data.id} value={data.id}>
                        {data.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className=" w-full">
                <Button className=" w-full" type="primary" htmlType="submit">
                  修改信息
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </LoadingView>
    </>
  );
}

export default UpdateUserInfo;
