import LoadingView from "@/utils/LoadingView";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import {
  delRailActivity,
  GetRailActivityInfo,
  IRailActivityInfoForm,
} from "@/api/railActivity";
import {
  AddRailActivityAsync,
  UpdateRailActivityAsync,
} from "@/store/reducer/railActivityReducer/railActivityAsync";

function AddOrUpdateRailActivity() {
  const data = useParams();
  const dispatch: any = useDispatch();

  const { id } = data;
  const UserInfoLoading = useSelector(
    (state: RootState) => state.user.UserInfoLoading
  );
  const [railActivityInfoLoading, setRailActivityInfoLoading] =
    useState<boolean>(false);
  const [railActivityInfo, setRailActivityInfo] =
    useState<IRailActivityInfoForm>({
      railName: "",
      line: "",
      bottomAsk: "",
      activityStart: "",
      activityTime1: moment(),
      section: "",
      stage: "",
      goExplain: "",
      otherExplain: "",
      ipPort: "",
      iocoAsk: "",
      state: 1,
      dispatch: "",
      activityEnd: "",
    });

  const GetRailActivityInfoF = async (id: string) => {
    try {
      const res = await GetRailActivityInfo(id);
      setRailActivityInfo({
        railName: res.data.data.railName,
        line: res.data.data.line,
        bottomAsk: res.data.data.bottomAsk,
        activityStart: res.data.data.activityStart,
        activityTime1: moment(
          res.data.data.activityTime,
          "YYYY/MM/DD HH:mm:ss"
        ),
        section: res.data.data.section,
        stage: res.data.data.stage,
        goExplain: res.data.data.goExplain,
        otherExplain: res.data.data.otherExplain,
        ipPort: res.data.data.ipPort,
        iocoAsk: res.data.data.iocoAsk,
        state: res.data.data.state,
        dispatch: res.data.data.dispatch,
        activityEnd: res.data.data.activityEnd,
      });
      setRailActivityInfoLoading(true);
    } catch (error) {
      setRailActivityInfoLoading(true);
    }
  };
  useEffect(() => {
    if (id !== undefined) {
      GetRailActivityInfoF(String(id));
    } else {
      setRailActivityInfoLoading(true);
    }
  }, []);
  const onFinish = (e: any) => {
    if (id !== undefined) {
      dispatch(
        UpdateRailActivityAsync({
          id: id,
          data: e,
        })
      );
    } else {
      dispatch(AddRailActivityAsync(e));
    }
    if (id !== undefined) {
      message.success("修改成功，即将跳转");
    } else {
      message.success("添加成功，即将跳转");
    }
    setTimeout(() => {
      if (id !== undefined) {
        window.location.href = "/rail/activity/info/" + id;
      } else {
        window.location.href = "/rail/activity";
      }
    }, 500);
  };
  return (
    <>
      <LoadingView loading={railActivityInfoLoading}>
        <div
          className="flex justify-center items-center my-10"
          // style={{ height: "100vh" }}
        >
          <div>
            <div
              className="flex justify-center items-center"
              style={{ width: "350px", padding: "10px" }}
            >
              <span className="text-lg font-bold">添加铁路联控活动</span>
            </div>
            <Form
              // name="basic"
              layout="vertical"
              className="w-full"
              initialValues={railActivityInfo}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="活动名称"
                name="railName"
                rules={[{ required: true, message: "请输入活动名称!" }]}
              >
                <Input value={railActivityInfo?.railName} />
              </Form.Item>
              <Form.Item
                label="活动期号"
                name="stage"
                rules={[{ required: true, message: "请输入活动期号" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="活动时间"
                name="activityTime1"
                rules={[{ required: true, message: "请选择活动时间" }]}
              >
                <DatePicker
                  placeholder="请选择举行活动时间"
                  className="w-full"
                  showTime
                />
              </Form.Item>
              <Form.Item
                label="使用线路"
                name="line"
                rules={[{ required: true, message: "请输入使用的线路" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="活动区间"
                name="section"
                rules={[{ required: true, message: "请输入活动区间" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="始发站"
                name="activityStart"
                rules={[{ required: true, message: "请输入始发站" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="终到站"
                name="activityEnd"
                rules={[{ required: true, message: "请输入终到站" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="车头要求"
                name="iocoAsk"
                rules={[{ required: true, message: "请输入车头要求" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="车底要求"
                name="bottomAsk"
                rules={[{ required: true, message: "请输入车底要求" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="调度员"
                name="dispatch"
                rules={[{ required: true, message: "请添加调度员" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="进入说明"
                name="goExplain"
                rules={[{ required: true, message: "请输入进入说明" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="IP端口"
                name="ipPort"
                rules={[{ required: true, message: "请输入IP端口" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="其他说明"
                name="otherExplain"
                rules={[{ required: true, message: "请输入其他说明" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="状态"
                name="state"
                rules={[{ required: true, message: "请选择状态" }]}
              >
                <Select placeholder="选择状态">
                  <Select.Option value={1}>发布活动</Select.Option>
                  <Select.Option value={2}>活动进行中</Select.Option>
                  <Select.Option value={3}>已结束</Select.Option>
                  <Select.Option value={0}>存稿</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className=" w-full">
                <Button className=" w-full" type="primary" htmlType="submit">
                  {id !== undefined ? "修改" : "添加"}
                </Button>
              </Form.Item>
            </Form>
            {id !== undefined ? (
              <Button
                className=" w-full"
                onClick={() => {
                  Modal.error({
                    title: "危险提示",
                    content: "确定要删除该活动吗？",
                    onOk() {
                      delRailActivity(String(id))
                        .then((res) => {
                          if (res.data.isDelete) {
                            message.success("删除活动成功");
                            setTimeout(() => {
                              window.location.href = "/rail/activity";
                            });
                          }
                        })
                        .catch((e) => {});
                    },
                    maskClosable: true,
                    onCancel() {},
                  });
                }}
                type="primary"
                danger
              >
                删除活动
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </LoadingView>
    </>
  );
}

export default AddOrUpdateRailActivity;
