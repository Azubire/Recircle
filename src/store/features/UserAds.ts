import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { baseUrl } from "./AuthSlice";

interface UserAds {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  data: {
    id: string;
    title: string;
    description: string;
    adImage: string;
    createdAt: string;
  }[];
}

const initialState: UserAds = {
  error: false,
  status: "idle",
  data: [],
};

export const getUserAds = createAsyncThunk("user/ads", async (id: string) => {
  const { data } = await axios.get<UserAds>(`${baseUrl}/users/ad/${id}`);

  return data;
});

const userAds = createSlice({
  name: "userAds",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserAds.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserAds.fulfilled, (state, action) => {
      if (action.payload.error) {
        (state.error = true), (state.status = "failed");
      } else {
        state.data = action.payload.data;
        state.error = false;
        state.status = "success";
      }
    });
    builder.addCase(getUserAds.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export const getUserAdsState = (state: RootState) => state.UserAds;

export default userAds.reducer;
