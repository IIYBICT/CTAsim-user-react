import { GetRailInfo, RegisterRail } from "@/api/rail";
import { getUserInfo, logout } from "@/api/user";
import { RailState } from "@/types/rail";
import { UserState } from "@/types/user";
import { clearAll } from "@/utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

const GetRailInfoAsync = createAsyncThunk("GetRailInfoAsync", async () => {
  const res = await GetRailInfo();
  return new Promise<RailState>((resolve, reject) => {
    resolve(res.data);
  });
});

const RegisterRailAsync = createAsyncThunk(
  "RegisterRailAsync",
  async (railName: string) => {
    const res = await RegisterRail(railName);
    return new Promise<RailState>((resolve, reject) => {
      resolve(res.data);
    });
  }
);
export { GetRailInfoAsync, RegisterRailAsync };
