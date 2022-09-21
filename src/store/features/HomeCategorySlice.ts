import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import axios from "axios";
import { baseUrl } from "../../utils/helpers";

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

export const fetchHomeCategory = createAsyncThunk(
  "home/Categories",
  async (token: string) => {
    const { data } = await axios.get<axiosReponse>(
      `${baseUrl}/home/categories`,
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
