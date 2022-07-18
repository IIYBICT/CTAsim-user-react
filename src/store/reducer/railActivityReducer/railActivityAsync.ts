import {
  AddRailActivity,
  AddRailActivityData,
  GetRailActivityInfo,
  GetRailActivityList,
  GetRailActivityUserList,
  GetSignRailActivityList,
  UpdateRailActivity,
} from "@/api/railActivity";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RailActivityState, RailActivityUserState } from "@/types/railActivity";

const GetRailActivityInfoAsync = createAsyncThunk(
  "GetRailActivityInfoAsync",
  async (id: string) => {
    const res: any = await GetRailActivityInfo(id);
    return new Promise<RailActivityState>((resolve, reject) => {
      resolve(res.data.data);
    });
  }
);

const GetRailActivityListAsync = createAsyncThunk(
  "GetRailActivityListAsync",
  async () => {
    const res: any = await GetRailActivityList();
    return new Promise<{ size: number; data: RailActivityState[] }>(
      (resolve, reject) => {
        resolve(res.data);
      }
    );
  }
);

const GetSignRailActivityListAsync = createAsyncThunk(
  "GetSignRailActivityListAsync",
  async () => {
    const res: any = await GetSignRailActivityList();
    return new Promise<{ size: number; data: RailActivityState[] }>(
      (resolve, reject) => {
        resolve(res.data);
      }
    );
  }
);
const GetRailActivityUserListAsync = createAsyncThunk(
  "GetRailActivityUserListAsync",
  async (id: string) => {
    const res: any = await GetRailActivityUserList(id);
    return new Promise<{ size: number; data: RailActivityUserState[] }>(
      (resolve, reject) => {
        resolve(res.data);
      }
    );
  }
);
const AddRailActivityAsync = createAsyncThunk(
  "AddRailActivityAsync",
  async (data: any) => {
    const res: any = await AddRailActivity(data);
    return new Promise<any>((resolve, reject) => {
      resolve(res.data);
    });
  }
);

const UpdateRailActivityAsync = createAsyncThunk(
  "UpdateRailActivityAsync",
  async ({ id, data }: any) => {
    data.id = id;
    const res: any = await UpdateRailActivity(data);
    return new Promise<any>((resolve, reject) => {
      resolve(res.data);
    });
  }
);

export {
  GetRailActivityInfoAsync,
  GetRailActivityListAsync,
  GetSignRailActivityListAsync,
  GetRailActivityUserListAsync,
  AddRailActivityAsync,
  UpdateRailActivityAsync,
};
