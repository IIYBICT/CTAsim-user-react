import { getToken } from "@/utils/auth";
import http from "@/utils/http";
import qs from "query-string";

interface AddRailActivityData {
  name: string;
  stage: string;
  time: string;
  line: string;
  section: string;
  start: string;
  end: string;
  iocoAsk: string;
  bottomAsk: string;
  goExplain: string;
  dispatch: string[];
  ipPort: string;
  otherExplain: string;
  state: number;
}
interface ISignRailActivityData {
  token?: string;
  activityId: string; // 活动Id
  busType: string; // 车型
  iocoType: string; // Ioco类型
  bottomType: string; // 底板类型
  busLength: string; // 车长
  busSum: string; // 车数
  railExplain: string; // 线路说明
}

interface IRailActivityInfoForm {
  token?: string;
  railName: string;
  line: string;
  bottomAsk: string;
  activityStart: string;
  activityTime1: moment.Moment;
  activityTime?: string;
  section: string;
  stage: string;
  goExplain: string;
  otherExplain: string;
  ipPort: string;
  iocoAsk: string;
  state: number;
  dispatch: string;
  activityEnd: string;
}

interface IUpdateRailActivityInfoForm extends IRailActivityInfoForm {
  id: string;
}

const GetRailActivityInfo = (id: string) => {
  return http.get("/api/rail/activity/info", {
    params: { token: getToken(), id: id },
  });
};

const GetRailActivityList = () => {
  return http.get("/api/rail/activity/list", {
    params: { token: getToken() },
  });
};
const GetSignRailActivityList = () => {
  return http.get("/api/rail/activity/sign/list", {
    params: { token: getToken() },
  });
};
const GetRailActivityUserList = (id: string) => {
  return http.get("/api/rail/activity/sign/all/list", {
    params: { token: getToken(), activityId: id },
  });
};

const AddRailActivity = (data: IRailActivityInfoForm) => {
  data.token = String(getToken());
  data.activityTime = data.activityTime1.format("YYYY-MM-DD HH:mm:ss");
  return http.post("/api/rail/activity/add", qs.stringify(data));
};

const UpdateRailActivity = (data: IUpdateRailActivityInfoForm) => {
  data.token = String(getToken());
  data.activityTime = data.activityTime1.format("YYYY-MM-DD HH:mm:ss");
  console.log(data);

  return http.post("/api/rail/activity/update", qs.stringify(data));
};

const setSignRailActivity = (data: ISignRailActivityData) => {
  data.token = String(getToken());
  return http.post("/api/rail/activity/sign/rail/activity", qs.stringify(data));
};

const setCancelSignRailActivity = (activityId: string) => {
  return http.post(
    "/api/rail/activity/cancel/sign",
    qs.stringify({
      token: getToken(),
      activityId: activityId,
    })
  );
};

const delRailActivity = (activityId: string) => {
  return http.post(
    "/api/rail/activity/delete",
    qs.stringify({
      token: getToken(),
      id: activityId,
    })
  );
};
export type {
  AddRailActivityData,
  IRailActivityInfoForm,
  IUpdateRailActivityInfoForm,
  ISignRailActivityData,
};
export {
  GetRailActivityInfo,
  GetRailActivityList,
  GetSignRailActivityList,
  GetRailActivityUserList,
  AddRailActivity,
  UpdateRailActivity,
  setSignRailActivity,
  setCancelSignRailActivity,
  delRailActivity,
};
