export interface RailActivityState {
  id: number;
  railName: string;
  addTime: string;
  line: string;
  bottomAsk: string;
  activityStart: string;
  activityTime: string;
  section: string;
  stage: string;
  goExplain: string;
  otherExplain: string;
  ipPort: string;
  iocoAsk: string;
  state: number;
  dispatch: string;
  activityEnd: string;
  signRailActivitySum: number;
  railActivityDispatchSum: number;
}

export interface RailActivityUserState {
  id: number;
  railName: string;
  username: string;
  busType: string;
  iocoType: string;
  bottomType: string;
  busLength: string;
  busSum: string;
  railExplain: string;
  signTime: string;
}
