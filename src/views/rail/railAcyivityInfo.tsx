import { GetRailInfo } from "@/api/rail";
import {
  GetRailActivityInfo,
  GetRailActivityUserList,
  setCancelSignRailActivity,
} from "@/api/railActivity";
import { RootState } from "@/store";
import {
  GetRailActivityInfoAsync,
  GetRailActivityUserListAsync,
} from "@/store/reducer/railActivityReducer/railActivityAsync";
import { RailState } from "@/types/rail";
import { RailActivityState, RailActivityUserState } from "@/types/railActivity";
import LoadingView from "@/utils/LoadingView";
import { CopyOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Descriptions,
  List,
  message,
  Modal,
  PageHeader,
  Tabs,
  Tag,
  Tooltip,
} from "antd";
import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function RailAcyivityInfo() {
  const params = useParams();
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const railActivityInfoLoading: boolean = useSelector(
    (state: RootState) => state.railActivity.railActivityInfoLoading
  );
  const UserInfo = useSelector((state: RootState) => state.user.UserInfo);
  const [railActivityInfo, setRailActivityInfo] = useState({
    id: "",
    railName: "",
    line: "",
    bottomAsk: "",
    activityStart: "",
    activityTime: "",
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
  // const railActivityUserList: RailActivityUserState[] = useSelector(
  //   (state: RootState) => state.railActivity.railActivityUserList
  // );
  const [railActivityUserList, setRailActivityUserList] = useState<
    RailActivityUserState[]
  >([]);
  const [RailInfo, setRailInfo] = useState<RailState>({
    id: 0,
    railName: "",
    username: "",
    activitySum: 0,
    connectSum: 0,
    state: 10,
    registerTime: "",
  });
  const [RailInfoLoading, setRailInfoLoading] = useState<boolean>(false);

  const [railDispatch, setRailDispatch] = React.useState([]);
  if (!railActivityInfoLoading) {
    dispatch(GetRailActivityInfoAsync(String(params.id)));
    dispatch(GetRailActivityUserListAsync(String(params.id)));
  }
  const [isSign, setIsSign] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);

  const onLoading = async () => {
    try {
      if (!isSign) {
        const RailInfoRes = await GetRailInfo();
        if (RailInfoRes.data !== undefined) {
          setRailInfo(RailInfoRes.data);
          setRailInfoLoading(true);
        }
        const railActivityInfoRes = await GetRailActivityInfo(
          String(params.id)
        );
        if (railActivityInfoRes.data.data === undefined) {
          message.error("没有找到该活动");
          navigate("/rail/activity");
        } else {
          const res = eval(railActivityInfoRes.data.data.dispatch);
          setRailDispatch(res);

          setRailActivityInfo(railActivityInfoRes.data.data);
          const railActivityUserListRes = await GetRailActivityUserList(
            String(params.id)
          );
          if (railActivityUserListRes.data.data !== undefined) {
            setRailActivityUserList(railActivityUserListRes.data.data);
          }
        }

        setLoading(true);
      }
    } catch (error) {
      message.error("请求错误");
      navigate("/rail/activity");
    }
  };
  const CancelSign = async () => {
    try {
      const res = await setCancelSignRailActivity(String(params.id));
      if (res.data.isCancelSign) {
        dispatch(GetRailActivityInfoAsync(String(params.id)));
        dispatch(GetRailActivityUserListAsync(String(params.id)));
        message.success("取消报名成功");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {}
  };
  useEffect(() => {
    onLoading();
  }, []);
  useEffect(() => {
    railActivityUserList.map((item: RailActivityUserState) => {
      if (item.railName === RailInfo.railName) {
        setIsSign(true);
      }
    });
  }, [railActivityUserList]);
  return (
    <>
      <LoadingView loading={Loading}>
        <div>
          <PageHeader
            ghost={false}
            title={
              <>
                <div>
                  <span>{railActivityInfo.railName}</span>
                  <Tooltip title="点击复制活动链接">
                    <CopyOutlined
                      style={{
                        fontSize: "14px",
                        marginLeft: "5px",
                        color: "#d9d9d9",
                      }}
                      onClick={() => {
                        copy(window.location.href);
                        message.success("活动链接复制成功");
                      }}
                    />
                  </Tooltip>
                </div>
              </>
            }
            extra={
              <>
                {UserInfo.groupId === 1 ? (
                  <Button
                    onClick={() => {
                      navigate("/rail/activity/update/" + railActivityInfo.id);
                    }}
                    key="1"
                  >
                    管理活动
                  </Button>
                ) : (
                  ""
                )}
                {railActivityInfo.state === 1 ? (
                  RailInfo.state === 3 ? (
                    isSign === false ? (
                      <Button
                        onClick={() => {
                          navigate(
                            "/rail/activity/sign/" + railActivityInfo.id
                          );
                        }}
                        type="primary"
                      >
                        报名参加
                      </Button>
                    ) : (
                      <>
                        <span>您已经报名了</span>
                        <Button
                          onClick={() => {
                            Modal.info({
                              title: "系统提示",
                              content: (
                                <div>
                                  <p>确定取消报名吗？</p>
                                  <p>取消后可重新报名</p>
                                </div>
                              ),
                              maskClosable: true,
                              onOk() {
                                CancelSign();
                              },
                              onCancel() {},
                              closable: true,
                              okText: "确定",
                              cancelText: "取消",
                            });
                          }}
                        >
                          取消报名
                        </Button>
                      </>
                    )
                  ) : (
                    ""
                  )
                ) : railActivityInfo.state === 2 ? (
                  <span>活动正在进行中</span>
                ) : (
                  <span>活动已结束</span>
                )}
              </>
            }
          >
            <Descriptions>
              <Descriptions.Item key={1} label="活动期号">
                {railActivityInfo.stage}
              </Descriptions.Item>
              <Descriptions.Item key={2} label="起始站">
                {railActivityInfo.activityStart}
              </Descriptions.Item>
              <Descriptions.Item key={3} label="终到站">
                {railActivityInfo.activityEnd}
              </Descriptions.Item>
              <Descriptions.Item key={4} label="活动区间">
                {railActivityInfo.section}
              </Descriptions.Item>
              <Descriptions.Item key={5} label="调度员">
                {!railDispatch
                  ? ""
                  : railDispatch.map((item: string) => {
                      return (
                        <>
                          <Tag color="#35cdca">{item}</Tag>
                        </>
                      );
                    })}
              </Descriptions.Item>
              <Descriptions.Item key={6} label="车头要求">
                {railActivityInfo.iocoAsk}
              </Descriptions.Item>
              <Descriptions.Item key={7} label="车底要求">
                {railActivityInfo.bottomAsk}
              </Descriptions.Item>
              <Descriptions.Item key={8} label="IP端口">
                {railActivityInfo.ipPort}
              </Descriptions.Item>
              <Descriptions.Item key={9} label="使用线路">
                {railActivityInfo.line}
              </Descriptions.Item>
              <Descriptions.Item key={10} label="活动时间">
                {railActivityInfo.activityTime}
              </Descriptions.Item>
              <Descriptions.Item key={11} label="进入说明">
                {railActivityInfo.goExplain}
              </Descriptions.Item>
              <Descriptions.Item key={12} label="其他说明">
                {railActivityInfo.otherExplain}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
          <div className=" mt-5 mx-4">
            <Card>
              <Tabs defaultActiveKey="1" type="card" size="middle">
                <Tabs.TabPane tab="已报名人员" key="1">
                  <List
                    itemLayout="vertical"
                    locale={{ emptyText: "暂无报名人员" }}
                    dataSource={railActivityUserList}
                    renderItem={(item: RailActivityUserState) => (
                      <List.Item
                        key={item.id}
                        actions={["报名时间：" + item.signTime]}
                      >
                        <List.Item.Meta
                          title={
                            <div>
                              <Tooltip title="连线账号">
                                <span>{item.railName}</span>
                              </Tooltip>
                              <Tooltip title="平台账号">
                                <span className=" text-slate-400 ml-1">
                                  ({item.username})
                                </span>
                              </Tooltip>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </LoadingView>
    </>
  );
}

export default RailAcyivityInfo;
