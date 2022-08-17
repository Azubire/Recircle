import { createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const icon1 = require("../../../assets/images/icon5.jpg");
const icon2 = require("../../../assets/images/icon6.jpg");
const icon3 = require("../../../assets/images/icon7.jpg");
const icon4 = require("../../../assets/images/icon8.jpg");

export interface RecyclingCategoryTypes {
  id: number;
  icon: ImageSourcePropType;
  title: string;
}

const initialCategory: RecyclingCategoryTypes[] = [
  {
    id: 1,
    icon: icon1,
    title: "Plastic",
  },
  {
    id: 2,
    icon: icon2,
    title: "Paper",
  },
  {
    id: 3,
    icon: icon3,
    title: "Glass",
  },
  {
    id: 4,
    icon: icon4,
    title: "Iron & Wood",
  },
];

const RecyclingCategorySlice = createSlice({
  name: "Categories",
  initialState: initialCategory,
  reducers: {},
});
export const getAllCategory = (state: RootState) => state.RecyclingCategory;

export default RecyclingCategorySlice.reducer;
