import { createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const img1 = require("../../../assets/images/azubire.jpg");
const img2 = require("../../../assets/images/cover.jpeg");
const img3 = require("../../../assets/images/profile.jpeg");

export interface NotificationStateTypes {
  id: number;
  title: string;
  body: string;
  img: ImageSourcePropType;
  priority: "High" | "Medium" | "Low";
  status: number;
}

const initialState: NotificationStateTypes[] = [
  {
    id: 1,
    title: "New Order",
    body: "You have a new Order from Albert",
    img: img1,
    priority: "Low",
    status: 0,
  },
  {
    id: 2,
    title: "Request Rejected",
    body: "You request with John has been canceled due to your failure to comply",
    img: img2,
    priority: "Medium",
    status: 0,
  },
  {
    id: 3,
    title: "Request Completed Successfully",
    body: "You request with Mr Watson has been completed Successfully",
    img: img3,
    priority: "High",
    status: 1,
  },
  {
    id: 4,
    title: "New Order",
    body: "You have a new Order from Albert",
    img: img1,
    priority: "Medium",
    status: 0,
  },
  {
    id: 2,
    title: "Request Rejected",
    body: "You request with John has been canceled due to your failure to comply",
    img: img2,
    priority: "High",
    status: 0,
  },
  {
    id: 4,
    title: "New Order",
    body: "You have a new Order from Albert",
    img: img1,
    priority: "Medium",
    status: 0,
  },
  {
    id: 1,
    title: "New Order",
    body: "You have a new Order from Albert",
    img: img1,
    priority: "Low",
    status: 0,
  },
];

const NotificationsSclice = createSlice({
  name: "Nofication",
  initialState,
  reducers: {},
});

export const getAllNotification = (state: RootState) => state.Notification;
export const getAllNotificationCount = (state: RootState) =>
  state.Notification.reduce(
    (prev, cur) => (cur.status === 0 ? ++prev : prev),
    0
  );

export default NotificationsSclice.reducer;
