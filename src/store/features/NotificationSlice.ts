import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const img1 = require("../../../assets/images/azubire.jpg");
const img2 = require("../../../assets/images/cover.jpeg");
const img3 = require("../../../assets/images/profile.jpeg");

const baseUrl = "http://192.168.43.35:3001";

export interface NotificationStateTypes {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  message: string;
  data: {
    id: number;
    title: string;
    body: string;
    avatar: string;
    status: boolean;
  }[];
}

const initialState: NotificationStateTypes = {
  error: false,
  status: "idle",
  message: "",
  data: [],
};

export const getNotifications = createAsyncThunk(
  "notifications",
  async (id: number) => {
    const { data } = await axios.get<NotificationStateTypes>(
      `${baseUrl}/notifications/${id}`
    );

    return data;
  }
);

export const notify = createAsyncThunk(
  "notify",
  async (notificationData: {
    id: number;
    body: {
      userId: number;
      adId: number;
      name: string;
      img: string | undefined;
      sellerId: number;
      message: string;
    };
  }) => {
    const { data } = await axios.post<{ error: false; message: string }>(
      `${baseUrl}/notifications/create/${notificationData.id}`,
      notificationData.body
    );

    return data;
  }
);

export const updateNotificationStatus = createAsyncThunk(
  "notification/update",
  async (id: number) => {
    const { data } = await axios.put<{ error: boolean; message: string }>(
      `${baseUrl}/notifications/update/${id}`
    );

    return data;
  }
);

const NotificationsSclice = createSlice({
  name: "Nofication",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(notify.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(notify.fulfilled, (state, actions) => {
      if (actions.payload.error) {
        state.status = "failed";
        state.error = true;
      } else {
        state.status = "success";

        state.error = false;
      }
    });
    builder.addCase(notify.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(getNotifications.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.error = true;
        state.status = "failed";
      } else {
        state.error = false;
        state.status = "success";
        state.data = action.payload.data;
      }
    });
    builder.addCase(getNotifications.rejected, (state) => {
      state.error = true;
      state.status = "failed";
    });
    builder.addCase(updateNotificationStatus.fulfilled, (state) => {});
  },
});

export const getAllNotification = (state: RootState) => state.Notification;
export const getAllNotificationCount = (state: RootState) =>
  state.Notification.data.reduce(
    (prev, cur) => (cur.status === false ? ++prev : prev),
    0
  );

export default NotificationsSclice.reducer;
