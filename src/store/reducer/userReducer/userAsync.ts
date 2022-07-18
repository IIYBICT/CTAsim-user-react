import { getUserInfo, logout } from "@/api/user";
import { UserState } from "@/types/user";
import { clearAll } from "@/utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate, useNavigate } from "react-router-dom";

export const GetUserInfoAsync = createAsyncThunk(
  "GetUserInfoAsync",
  async () => {
    const res: any = await getUserInfo();

    return new Promise<UserState>((resolve, reject) => {
      resolve(res.data);
    });
  }
);

export const logoutAsync = createAsyncThunk("logoutAsync", async () => {
  const res = await logout();
  return new Promise<any>((resolve, reject) => {
    clearAll();
    resolve(res.data);
  });
});
