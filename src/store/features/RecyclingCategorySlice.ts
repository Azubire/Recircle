import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const icon1 = require("../../../assets/images/icon5.jpg");
const icon2 = require("../../../assets/images/icon6.jpg");
const icon3 = require("../../../assets/images/icon7.jpg");
const icon4 = require("../../../assets/images/icon8.jpg");

export interface RecyclingCategoryTypes {
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
  data: { id: number; icon: ImageSourcePropType; name: string }[];
}
// {
//   id: 1,
//   icon: icon1,
//   title: "Plastic",
// },
// {
//   id: 2,
//   icon: icon2,
//   title: "Paper",
// },
// {
//   id: 3,
//   icon: icon3,
//   title: "Glass",
// },
// {
//   id: 4,
//   icon: icon4,
//   title: "Iron & Wood",
// },
const initialCategory: RecyclingCategoryTypes = {
  status: "idle",
  error: false,
  data: [],
};
export const fetchRecyclingCategories = createAsyncThunk(
  "recycling/category",
  async () => {
    const { data } = await axios.get<RecyclingCategoryTypes>(
      "http://192.168.43.35:3001/admin/recycling"
    );
    return data;
  }
);

const RecyclingCategorySlice = createSlice({
  name: "Categories",
  initialState: initialCategory,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchRecyclingCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchRecyclingCategories.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.data = action.payload.data;
        state.status = "success";
      } else {
        state.error = true;
        state.status = "failed";
      }
    }),
      builder.addCase(fetchRecyclingCategories.rejected, (state, action) => {
        state.error = true;
        state.status = "failed";
      });
  },
});
export const getAllCategory = (state: RootState) => state.RecyclingCategory;

export default RecyclingCategorySlice.reducer;
