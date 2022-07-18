import {
  GetRailActivityInfo,
  ISignRailActivityData,
  setSignRailActivity,
} from "@/api/railActivity";
import { RootState } from "@/store";
import LoadingView from "@/utils/LoadingView";
import {
  Button,
  Form,
  FormInstance,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function SignRailActivity() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const RailActivityInfo = async (id: string) => {
    try {
      const res = await GetRailActivityInfo(id);
      console.log(res.data.data);
      if (res.data.data === undefined) {
        message.error("没有找到该活动");
        navigate("/rail/activity");
      } else {
        setTitle(res.data.data.railName);
      }
    } catch (error) {}
  };
  useEffect(() => {
    RailActivityInfo(String(params.id));
  }, []);
  const formRef = React.createRef<FormInstance>();
  const onFinish = async (data: any) => {
    console.log(data);
    try {
      const res = await setSignRailActivity({
        activityId: String(params.id),
        busType: data.busType,
        iocoType: data.iocoType,
        bottomType: data.bottomType,
        busLength: data.busLength,
        busSum: data.busSum,
        railExplain: data.railExplain,
      });
      if (res.data.isSign) {
        message.success("报名成功");
        setTimeout(() => {
          window.location.href = "/rail/activity/info/" + params.id;
        });
      }
    } catch (error) {}
  };
  return (
    <>
      <LoadingView loading={true}>
        {/* String busType, // 车型
            String iocoType, // Ioco类型
            String bottomType, // 底板类型
            String busLength, // 车长
            String busSum, // 车数
            String railExplain // 线路说明 */}
        <div
          className="flex justify-center items-center my-32"
          // style={{ height: "100vh" }}
        >
          <div>
            <div
              className="flex justify-center items-center"
              style={{ width: "350px", padding: "10px" }}
            >
              <span className="text-lg font-bold">{title} - 活动报名</span>
            </div>
            <Form
              // name="basic"
              ref={formRef}
              layout="vertical"
              className="w-full"
              //   initialValues={railActivityInfo}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="车型"
                name="busType"
                rules={[{ required: true, message: "请选择车型!" }]}
              >
                <Select>
                  <Select.Option value="1">客运</Select.Option>
                  <Select.Option value="2">货运</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="车头型号"
                name="iocoType"
                rules={[{ required: true, message: "请输入车头型号!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="底盘型号"
                name="bottomType"
                rules={[{ required: true, message: "请输入底盘型号!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="车辆长度"
                name="busLength"
                className=" w-full"
                rules={[{ required: true, message: "请输入车辆长度!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="车辆数量"
                name="busSum"
                className=" w-full"
                rules={[{ required: true, message: "请输入车辆数量!" }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                label="其他说明"
                name="railExplain"
                rules={[{ required: false, message: "请输入其他说明!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item className=" w-full">
                <Button className=" w-full" type="primary" htmlType="submit">
                  提交报名信息
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </LoadingView>
    </>
  );
}

export default SignRailActivity;
