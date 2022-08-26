import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import axios from "axios";

const icon1 = require("../../../assets/images/icon1.png");
const icon2 = require("../../../assets/images/icon2.png");
const icon3 = require("../../../assets/images/icon3.png");
const icon4 = require("../../../assets/images/icon4.png");

export interface HomeCategorySliceTypes {
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
  message: string;
  data: {
    id: number;
    icon: ImageSourcePropType;
    title: string;
    screen: "Sell" | "RecyclersStack" | "Categories" | "MyAds";
  }[];
}

export interface axiosReponse {
  error: boolean;
  message: string;
  data: {
    id: number;
    icon: ImageSourcePropType;
    title: string;
    screen: "Sell" | "RecyclersStack" | "Categories" | "MyAds";
  }[];
}

const initialHomeCategory: HomeCategorySliceTypes = {
  status: "idle",
  error: false,
  message: "",
  data: [],
};
// {
//   id: 1,
//   icon: icon1,
//   title: "Sell",
//   screen: "Sell",
// },
// {
//   id: 2,
//   icon: icon2,
//   title: "Recyclers",
//   screen: "RecyclersStack",
// },
// {
//   id: 3,
//   icon: icon3,
//   title: "Categories",
//   screen: "Categories",
// },
// {
//   id: 4,
//   icon: icon4,
//   title: "My Ads",
//   screen: "MyAds",
// },
export const fetchHomeCategory = createAsyncThunk(
  "home/Categories",
  async (token: string) => {
    const { data } = await axios.get<axiosReponse>(
      "http://192.168.43.35:3001/home/categories",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return data;
  }
);

const HomeCategorySlice = createSlice({
  name: "Home",
  initialState: initialHomeCategory,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchHomeCategory.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchHomeCategory.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
        (state.error = true), (state.message = action.payload.message);
      } else {
        (state.error = false), (state.message = action.payload.message);
        state.status = "success";
        state.data = action.payload.data;
      }
    });
  },
});

export const getHomeCategory = (state: RootState) => state.HomeCategory;

export default HomeCategorySlice.reducer;
