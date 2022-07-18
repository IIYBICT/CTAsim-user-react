import RatingTagView from "@/components/RatingTagView";
import AppConfig from "@/config/AppConfig";
import { RootState } from "@/store";
import { UserState } from "@/types/user";
import {
  Avatar,
  Button,
  Card,
  Col,
  PageHeader,
  Row,
  Statistic,
  Tag,
  Tooltip,
} from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function dashboard() {
  const navigate = useNavigate();
  const UserInfo: UserState = useSelector(
    (state: RootState) => state.user.UserInfo
  );
  return (
    <>
      <div>
        <PageHeader
          ghost={false}
          title={"工作台"}
          extra={[
            <Button
              onClick={() => {
                navigate("/user/info");
              }}
              key="1"
            >
              查看个人信息
            </Button>,
          ]}
        >
          <Row>
            <div style={{ flex: 1 }}>
              <Meta
                avatar={
                  <Avatar
                    size={75}
                    style={{
                      backgroundColor: "#35cdca",
                      verticalAlign: "middle",
                    }}
                  >
                    <span style={{ fontSize: "30px" }}>
                      {UserInfo.username.substring(0, 1)}
                    </span>
                  </Avatar>
                }
                title={
                  <div>
                    <span className="mr-2">{UserInfo.username}</span>
                    <Tooltip title={<RatingColorTagView />}>
                      <span>
                        <RatingTagView UserInfo={UserInfo} />
                      </span>
                    </Tooltip>
                  </div>
                }
                description="简单说两句介绍一下自己吧"
              />
            </div>
            {/* <div className=" pt-3">
              <Row gutter={16}>
                <Col>
                  <Statistic title="参加活动数" suffix="次" value={10} />
                </Col>
                <Col>
                  <Statistic title="积分数" suffix="个" value={0} />
                </Col>
                <Col>
                  <Statistic title="参加铁路联控数" suffix="次" value={10} />
                </Col>
                <Col>
                  <Statistic title="待添加" suffix="次" value={10} />
                </Col>
              </Row>
            </div> */}
          </Row>
        </PageHeader>
      </div>
    </>
  );
}
function RatingColorTagView() {
  return (
    <>
      <span>等级颜色说明：</span>
      <br />
      <Tag>无效(封禁账号)</Tag>
      <br />
      <Tag color="processing">观察员(机组)</Tag>
      <br />
      <Tag color="#00B4D5">学员1(地面/放行)</Tag>
      <br />
      <Tag color="#00B4D5">学员2(塔台)</Tag>
      <br />
      <Tag color="#00B4D5">学员3(终端)</Tag>
      <br />
      <Tag color="#FF0075">区域1(区调)</Tag>
      <br />
      <Tag color="#FF0075">区域2(区调)</Tag>
      <br />
      <Tag color="#FF0075">区域3(区调)</Tag>
      <br />
      <Tag color="#1B9CE3">教员1(教员)</Tag>
      <br />
      <Tag color="#1B9CE3">教员2(教员)</Tag>
      <br />
      <Tag color="#1B9CE3">教员3(教员)</Tag>
      <br />
      <Tag color="#747ACE">监管(监管)</Tag>
      <br />
      <Tag color="#A0529F">管理员(总局)</Tag>
      <br />
    </>
  );
}

export default dashboard;
