import { UserState } from "@/types/user";
import { clearAll } from "@/utils/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetUserInfoAsync, logoutAsync } from "./userAsync";

interface initialStateData {
  UserInfo: UserState;
  UserInfoLoading: boolean;
  IsActivateLoading: boolean;
}

const initialState: initialStateData = {
  UserInfo: {
    id: "",
    userCall: "",
    email: "",
    username: "",
    groupId: 0,
    groupName: "",
    IsActivate: false,
    qq: "",
    lastLoginTime: undefined,
    registerTime: undefined,
    ratingId: 0,
    ratingName: "",
    ratingNameEn: "",
    IsCallActivate: false,
  },
  UserInfoLoading: false,
  IsActivateLoading: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsActivateLoading: (state, action: PayloadAction<boolean>) => {
      state.IsActivateLoading = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserState>) => {
      state.UserInfo = action.payload;
    },
    setUserInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.UserInfoLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetUserInfoAsync.pending, (state, action) => {
        state.UserInfoLoading = false;
      })
      .addCase(
        GetUserInfoAsync.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.UserInfo = action.payload;
          state.UserInfoLoading = true;
        }
      )
      .addCase(logoutAsync.fulfilled, (state, action) => {
        clearAll();
      });
  },
});

export const { setIsActivateLoading, setUserInfo, setUserInfoLoading } =
  userReducer.actions;
export default userReducer.reducer;
