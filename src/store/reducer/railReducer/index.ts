import { RailState } from "@/types/rail";
import { createSlice } from "@reduxjs/toolkit";
import { GetRailInfoAsync, RegisterRailAsync } from "./railAsync";

interface initialStateData {
  RailInfo: RailState;
  RailInfoLoading: boolean;
  RegisterRailLoading: boolean;
}

const initialState: initialStateData = {
  RailInfo: {
    id: 0,
    railName: "",
    username: "",
    activitySum: 0,
    connectSum: 0,
    state: 10,
    registerTime: "",
  },
  RailInfoLoading: false,
  RegisterRailLoading: false,
};

const railReducer = createSlice({
  name: "rail",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetRailInfoAsync.pending, (state, action) => {
        state.RailInfoLoading = false;
      })
      .addCase(GetRailInfoAsync.fulfilled, (state, action) => {
        if (action.payload.id) {
          state.RailInfo = action.payload;
        }
        state.RailInfoLoading = true;
      })
      .addCase(RegisterRailAsync.pending, (state, action) => {
        state.RegisterRailLoading = false;
      })
      .addCase(RegisterRailAsync.fulfilled, (state, action) => {
        state.RegisterRailLoading = true;
      });
  },
});

export const {} = railReducer.actions;
export default railReducer.reducer;
