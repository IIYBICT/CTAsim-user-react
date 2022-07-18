import {
  GetRailActivityList,
  GetSignRailActivityList,
} from "@/api/railActivity";
import { AppDispatch, RootState } from "@/store";
import { setGetProjectListLoading } from "@/store/reducer/appReducer";
import { GetRailActivityListAsync } from "@/store/reducer/railActivityReducer/railActivityAsync";
import { GetRailInfoAsync } from "@/store/reducer/railReducer/railAsync";
import { RailActivityState } from "@/types/railActivity";
import LoadingView from "@/utils/LoadingView";
import {
  Avatar,
  Button,
  Card,
  Col,
  List,
  PageHeader,
  Row,
  Statistic,
  Tabs,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RailActivity() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const RailInfoLoading = useSelector(
    (state: RootState) => state.rail.RailInfoLoading
  );
  const UserInfo = useSelector((state: RootState) => state.user.UserInfo);
  if (!RailInfoLoading) {
    dispatch(GetRailInfoAsync());
  }
  const [railActivityListLoading, setRailActivityListLoading] = useState(false);
  if (!railActivityListLoading) {
    dispatch(GetRailActivityListAsync());
  }
  const [railActivityList, setRailActivityList] = useState<RailActivityState[]>(
    []
  );
  const [signRailActivitySum, setSignRailActivitySum] = useState(0);
  const [endActivity, setEndActivity] = useState(0);
  const [conductActivity, setConductActivity] = useState(0);
  const onLoading = async () => {
    try {
      const RailActivityListRes = await GetRailActivityList();
      const SignRailActivityListRes = await GetSignRailActivityList();
      setSignRailActivitySum(SignRailActivityListRes.data.size);
      setRailActivityList(RailActivityListRes.data.data);
      setRailActivityListLoading(true);
    } catch (error) {}
  };
  useEffect(() => {
    onLoading();
  }, []);
  useEffect(() => {
    railActivityList.map((item: RailActivityState) => {
      if (item.state === 2) {
        setConductActivity(conductActivity + 1);
      }
      if (item.state === 3) {
        setEndActivity(endActivity + 1);
      }
    });
  }, [railActivityList]);
  return (
    <>
      <LoadingView loading={railActivityListLoading}>
        <PageHeader
          ghost={false}
          title={"铁路联控活动中心"}
          extra={[
            UserInfo.groupId === 1 ? (
              <Button onClick={() => navigate("/rail/activity/add")} key="1">
                添加活动
              </Button>
            ) : (
              ""
            ),
          ]}
        >
          <Row gutter={20}>
            <Col>
              <Tooltip title="已发布活动">
                <Statistic
                  title="已发布活动数"
                  suffix="个"
                  value={railActivityList.length}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="已参与活动次数">
                <Statistic
                  title="已参与活动"
                  suffix="个"
                  value={signRailActivitySum}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="进行中活动数">
                <Statistic
                  title="进行中活动"
                  suffix="个"
                  value={conductActivity}
                />
              </Tooltip>
            </Col>
            <Col></Col>
            <Col>
              <Tooltip title="已结束活动数">
                <Statistic title="已结束活动" suffix="个" value={endActivity} />
              </Tooltip>
            </Col>
          </Row>
        </PageHeader>
        <div className="mx-4 mt-5">
          <Card>
            <Tabs defaultActiveKey="1" type="card" size="middle">
              <Tabs.TabPane tab="报名中" key="1">
                <List
                  itemLayout="vertical"
                  dataSource={railActivityList}
                  renderItem={(item) =>
                    item.state === 1 ? (
                      <List.Item
                        key={item.id}
                        actions={[
                          "已报名人数：" + item.signRailActivitySum,
                          "调度人数：" + item.railActivityDispatchSum,
                          "发布时间：" + item.addTime,
                        ]}
                        extra={
                          <div>
                            {/* <Button type="primary" className=" mr-2">
                              报名参与
                            </Button> */}
                            {/* <Button>报名</Button> */}
                          </div>
                        }
                      >
                        <List.Item.Meta
                          title={
                            <a href={"/rail/activity/info/" + item.id}>
                              {item.railName}
                            </a>
                          }
                          description={item.otherExplain}
                        />
                      </List.Item>
                    ) : (
                      ""
                    )
                  }
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="进行中" key="2">
                <List
                  itemLayout="vertical"
                  dataSource={railActivityList}
                  renderItem={(item) =>
                    item.state === 2 ? (
                      <List.Item
                        key={item.id}
                        actions={[
                          "已报名人数：" + item.signRailActivitySum,
                          "调度人数：" + item.railActivityDispatchSum,
                          "发布时间：" + item.addTime,
                        ]}
                        extra={
                          <div>
                            {/* 活动正在进行中 */}
                            {/* <Button type="primary" className=" mr-2">
                          报名参与
                        </Button>
                        <Button>报名</Button> */}
                          </div>
                        }
                      >
                        <List.Item.Meta
                          title={
                            <a href={"/rail/activity/info/" + item.id}>
                              {item.railName}
                            </a>
                          }
                          description={item.otherExplain}
                        />
                      </List.Item>
                    ) : (
                      ""
                    )
                  }
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="已结束" key="3">
                <List
                  itemLayout="vertical"
                  dataSource={railActivityList}
                  renderItem={(item) =>
                    item.state === 3 ? (
                      <List.Item
                        key={item.id}
                        actions={[
                          "已报名人数：" + item.signRailActivitySum,
                          "调度人数：" + item.railActivityDispatchSum,
                          "发布时间：" + item.addTime,
                        ]}
                        // extra={<div>活动已结束</div>}
                      >
                        <List.Item.Meta
                          title={
                            <a href={"/rail/activity/info/" + item.id}>
                              {item.railName}
                            </a>
                          }
                          description={item.otherExplain}
                        />
                      </List.Item>
                    ) : (
                      ""
                    )
                  }
                />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </div>
      </LoadingView>
    </>
  );
}

export default RailActivity;
