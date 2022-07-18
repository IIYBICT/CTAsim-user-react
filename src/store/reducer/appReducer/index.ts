import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {} from "./appAsync";

interface initialStateData {
  GetProjectListLoading: boolean;
}

const initialState: initialStateData = {
  GetProjectListLoading: false,
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGetProjectListLoading: (state, action) => {
      state.GetProjectListLoading = action.payload;
    },
  },
  extraReducers(builder) {},
});
export const { setGetProjectListLoading } = appReducer.actions;
export default appReducer.reducer;
