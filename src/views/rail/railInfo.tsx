import { CopyOutlined, MailOutlined } from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  message,
  PageHeader,
  Row,
  Statistic,
  Tooltip,
} from "antd";
import copy from "copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  GetRailInfoAsync,
  RegisterRailAsync,
} from "@/store/reducer/railReducer/railAsync";
import LoadingView from "@/utils/LoadingView";
import { useEffect, useState } from "react";
import { RailState } from "@/types/rail";
import { ValidateStatus } from "antd/lib/form/FormItem";
import { GetRailInfo, RegisterRail } from "@/api/rail";
import { GetSignRailActivityList } from "@/api/railActivity";
const data: any[] = [];
function RailInfo() {
  const dispatch: any = useDispatch();
  const RailInfo = useSelector((state: RootState) => state.rail.RailInfo);
  const RailInfoLoading = useSelector(
    (state: RootState) => state.rail.RailInfoLoading
  );
  if (!RailInfoLoading) {
    dispatch(GetRailInfoAsync());
  }
  const onLoading = async () => {
    try {
      const SignRailActivityListRes = await GetSignRailActivityList();
      if (SignRailActivityListRes.data.size !== undefined) {
        setSignRailActivitySum(SignRailActivityListRes.data.size);
      }
    } catch (error) {
      // setRailInfoLoading(true);
    }
  };
  onLoading();
  useEffect(() => {}, []);

  const [signRailActivitySum, setSignRailActivitySum] = useState(0);
  const [onFinishLoading, setOnFinishLoading] = useState<boolean>(false);
  const [onFinishDisabled, setOnFinishDisabled] = useState<boolean>(true);
  const RegisterRailLoading = useSelector(
    (state: RootState) => state.rail.RegisterRailLoading
  );
  useEffect(() => {
    if (RegisterRailLoading) {
      setOnFinishLoading(false);
      window.location.reload();
    }
  }, [RegisterRailLoading]);
  return (
    <>
      <LoadingView loading={RailInfoLoading}>
        {RailInfo.id === undefined ? (
          <RailInfoView RailInfo={RailInfo} />
        ) : (
          <>
            {RailInfo.railName !== "" ? (
              RailInfo.state === 3 ? (
                <>
                  <PageHeader
                    ghost={false}
                    title={
                      <div>
                        <Tooltip title="这是你连线的账号">
                          <span>{RailInfo.railName}</span>
                        </Tooltip>
                        <Tooltip title="点击复制连线账号">
                          <CopyOutlined
                            style={{
                              fontSize: "14px",
                              marginLeft: "5px",
                              color: "#d9d9d9",
                            }}
                            onClick={() => {
                              copy(RailInfo.railName);
                              message.success("连线账号复制成功");
                            }}
                          />
                        </Tooltip>
                      </div>
                    }
                    // subTitle={"连线账号"}
                    extra={
                      [
                        // <Button key="1">操作</Button>
                      ]
                    }
                  >
                    <Row gutter={20}>
                      <Col>
                        <Tooltip title="这是你日常连线次数">
                          <Statistic
                            title="日常连线次数"
                            suffix="次"
                            value={RailInfo.connectSum}
                          />
                        </Tooltip>
                      </Col>
                      <Col>
                        <Tooltip title="这是你参与活动次数">
                          <Statistic
                            title="参与活动次数"
                            suffix="次"
                            value={signRailActivitySum}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  </PageHeader>
                  <div className=" mx-5 mt-5">
                    <Card title="联控资讯">
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        locale={{
                          emptyText: "暂无资讯",
                        }}
                        renderItem={(item) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                              }
                              title={<a href="#">{item.title}</a>}
                              description={item.title + " - 资讯详情"}
                            />
                          </List.Item>
                        )}
                      />
                    </Card>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {RailInfo.state === 0 ? (
                      <TipsView
                        title="审核中..."
                        content="您提交的信息已收到，正在审核中，审核通过会以邮件形式提醒给您"
                      />
                    ) : (
                      ""
                    )}
                    {RailInfo.state === 1 ? (
                      <TipsView
                        title="您已被封禁"
                        content="您已被管理员封禁，具体原因请联系群管理"
                      />
                    ) : (
                      ""
                    )}
                    {RailInfo.state === 2 ? (
                      <RailInfoView RailInfo={RailInfo} />
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )
            ) : (
              <RailInfoView RailInfo={RailInfo} />
            )}
          </>
        )}
      </LoadingView>
    </>
  );
}

function TipsView({ title, content }: { title: string; content: string }) {
  return (
    <>
      <div className=" mt-52 w-full min-h-full">
        <div className="text-2xl font-bold flex justify-center items-center">
          {title}
        </div>
        <div className="text-md mt-3 text-stone-400 flex justify-center items-center">
          {content}
        </div>
      </div>
    </>
  );
}

function RailInfoView({ RailInfo }: { RailInfo: RailState }) {
  const dispatch: any = useDispatch();
  const [railName, setRailName] = useState<{
    value: string;
    validateStatus?: ValidateStatus;
    errorMsg?: string | null;
  }>({
    value: "LC",
  });
  const [onFinishLoading, setOnFinishLoading] = useState<boolean>(false);
  const [onFinishDisabled, setOnFinishDisabled] = useState<boolean>(true);
  const onFinish = async (data: { railName: string }) => {
    setOnFinishLoading(true);
    try {
      const res = await RegisterRail(data.railName);
      if (res.data.isRegister) {
        message.success("连线账号申请已提交");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setOnFinishLoading(false);
      }
    } catch (error) {
      setOnFinishLoading(false);
    }
  };
  const tips = "连线呼号必须为LC开头";
  const validatePrimeRailName = (
    railName: string
  ): {
    validateStatus: ValidateStatus;
    errorMsg: string | null;
  } => {
    console.log(railName.substring(0, 2) === "LC");
    if (railName.substring(0, 2) !== "LC") {
      return {
        validateStatus: "error",
        errorMsg: "连线呼号必须为LC开头",
      };
    }
    if (railName.length !== 4) {
      return {
        validateStatus: "error",
        errorMsg: "连线呼号限制为4位且为大写字母",
      };
    }
    if (!/^[A-Z]+$/.exec(railName)) {
      return {
        validateStatus: "error",
        errorMsg: "连线呼号必须为LC开头且限制为4位且为大写字母的呼号!",
      };
    }
    setOnFinishDisabled(false);
    return {
      validateStatus: "success",
      errorMsg: "该连线账号符合要求",
    };
  };
  const onRailNameChange = (railName: any) => {
    setRailName({
      ...validatePrimeRailName(railName.nativeEvent.path[0].value),
      value: railName.nativeEvent.path[0].value,
    });
  };
  return (
    <div className=" w-full flex justify-center items-center pt-20">
      <Card className=" w-11/12 md:w-11/12 xl:w-2/4 2xl:w-2/6">
        <div
          className="flex justify-center items-center"
          style={{ width: "100%", padding: "10px" }}
        >
          <span className="text-lg font-bold">铁路联控激活系统</span>
        </div>
        {RailInfo !== null ? (
          <>
            {RailInfo.state === 2 ? (
              <Alert
                message={RailInfo.railName + "连线呼号审核不通过"}
                type="error"
              />
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        <Form
          name="rail-form"
          className=" mt-4"
          // initialValues={initialValues}
          layout={"vertical"}
          onFinish={onFinish}
        >
          <Form.Item
            name="railName"
            label="连线账号"
            validateStatus={railName.validateStatus}
            rules={[{ required: true, message: "请输入连线账号!" }]}
            help={railName.errorMsg || tips}
          >
            <Input
              prefix={<MailOutlined />}
              onChange={onRailNameChange}
              placeholder="请输入连线账号"
              value={railName.value}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={onFinishLoading}
              disabled={onFinishDisabled}
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              发送激活申请
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
export default RailInfo;
