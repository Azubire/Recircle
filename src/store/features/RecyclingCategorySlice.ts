import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { baseUrl } from "../../utils/helpers";

export interface RecyclingCategoryTypes {
  status: "idle" | "loading" | "success" | "failed";
  error: boolean;
  data: { id: number; icon: ImageSourcePropType; name: string }[];
}

const initialCategory: RecyclingCategoryTypes = {
  status: "idle",
  error: false,
  data: [],
};
export const fetchRecyclingCategories = createAsyncThunk(
  "recycling/category",
  async () => {
    const { data } = await axios.get<RecyclingCategoryTypes>(
      `${baseUrl}/admin/recycling`
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
