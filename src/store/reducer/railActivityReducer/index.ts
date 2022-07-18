import { RailActivityState, RailActivityUserState } from "@/types/railActivity";
import { UserState } from "@/types/user";
import { clearAll } from "@/utils/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AddRailActivityAsync,
  GetRailActivityInfoAsync,
  GetRailActivityListAsync,
  GetRailActivityUserListAsync,
  GetSignRailActivityListAsync,
  UpdateRailActivityAsync,
} from "./railActivityAsync";

interface initialStateData {
  railActivityInfo: RailActivityState;
  railActivityList: RailActivityState[];
  railActivityUserList: RailActivityUserState[];
  railActivityListSize: number;
  railActivityInfoLoading: boolean;
  railActivityListLoading: boolean;
  signRailActivityListLoading: boolean;
  railActivityUserListLoading: boolean;
  signSum: number;
}

const initialState: initialStateData = {
  railActivityInfo: {
    id: 0,
    railName: "",
    addTime: "",
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
    state: 0,
    activityEnd: "",
    dispatch: "",
    signRailActivitySum: 0,
    railActivityDispatchSum: 0,
  },
  railActivityList: [],
  railActivityUserList: [],
  railActivityListSize: 0,
  railActivityInfoLoading: false,
  railActivityListLoading: false,
  signRailActivityListLoading: false,
  railActivityUserListLoading: false,
  signSum: 0,
};

const railActivityReducer = createSlice({
  name: "railActivity",
  initialState,
  reducers: {
    setRailActivityList: (
      state,
      action: PayloadAction<RailActivityState[]>
    ) => {
      state.railActivityList = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetRailActivityInfoAsync.pending, (state, action) => {
        state.railActivityInfoLoading = false;
      })
      .addCase(
        GetRailActivityInfoAsync.fulfilled,
        (state, action: PayloadAction<RailActivityState>) => {
          state.railActivityInfo = action.payload;
          state.railActivityInfoLoading = true;
        }
      )
      .addCase(GetRailActivityListAsync.pending, (state, action) => {
        state.railActivityListLoading = false;
      })
      .addCase(
        GetRailActivityListAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ size: number; data: RailActivityState[] }>
        ) => {
          state.railActivityListLoading = true;
          state.railActivityList = action.payload.data;
          state.railActivityListSize = action.payload.size;
        }
      )
      .addCase(GetSignRailActivityListAsync.pending, (state, action) => {
        state.signRailActivityListLoading = false;
      })
      .addCase(
        GetSignRailActivityListAsync.fulfilled,
        (
          state,
          action: PayloadAction<{ size: number; data: RailActivityState[] }>
        ) => {
          state.signRailActivityListLoading = true;
          state.signSum = action.payload.size;
        }
      )
      .addCase(GetRailActivityUserListAsync.pending, (state, action) => {
        state.railActivityUserListLoading = false;
      })
      .addCase(GetRailActivityUserListAsync.fulfilled, (state, action) => {
        state.railActivityUserListLoading = true;
        state.railActivityUserList = action.payload.data;
      })
      .addCase(
        AddRailActivityAsync.pending,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        AddRailActivityAsync.fulfilled,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        UpdateRailActivityAsync.pending,
        (state, action: PayloadAction<any>) => {}
      )
      .addCase(
        UpdateRailActivityAsync.fulfilled,
        (state, action: PayloadAction<any>) => {}
      );
  },
});

export const { setRailActivityList } = railActivityReducer.actions;
export default railActivityReducer.reducer;
