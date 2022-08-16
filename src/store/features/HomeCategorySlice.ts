import { createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const icon1 = require("../../../assets/images/icon1.png");
const icon2 = require("../../../assets/images/icon2.png");
const icon3 = require("../../../assets/images/icon3.png");
const icon4 = require("../../../assets/images/icon4.png");

export interface HomeCategorySliceTypes {
  id: number;
  icon: ImageSourcePropType;
  title: string;
  screen: "Sell" | "RecyclersStack" | "Categories" | "MyAds";
}

const initialHomeCategory: HomeCategorySliceTypes[] = [
  {
    id: 1,
    icon: icon1,
    title: "Sell",
    screen: "Sell",
  },
  {
    id: 2,
    icon: icon2,
    title: "Recyclers",
    screen: "RecyclersStack",
  },
  {
    id: 3,
    icon: icon3,
    title: "Categories",
    screen: "Categories",
  },
  {
    id: 4,
    icon: icon4,
    title: "My Ads",
    screen: "MyAds",
  },
];

const HomeCategorySlice = createSlice({
  name: "Home",
  initialState: initialHomeCategory,
  reducers: {},
});

export const getHomeCategory = (state: RootState) => state.HomeCategory;

export default HomeCategorySlice.reducer;
