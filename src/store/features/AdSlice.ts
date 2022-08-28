import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { useAppSelector } from "../../hooks/reduxhooks";
import Search from "../../screens/Search";
import { formData } from "../../screens/Sell";
import { getAuth } from "./AuthSlice";

const baseUrl = "http://192.168.43.35:3001";

export interface adFilterTypes {
  id: number;
  userId: number;
  title: string;
  description: string;
  adImage: string;
  RecyclingCategory: {
    name: string;
  };
  User: {
    id: number;
    name: string;
    profileImg: string;
  };
  price: string;
  createdAt: string;
  status: "pending" | "complete" | "rejected";
}

export interface ResponseDataTypes {
  error: boolean;
  message: string;
  data: {
    newestAds: adFilterTypes[];
    bestSellingAds: adFilterTypes[];
    topAds: adFilterTypes[];
  };
}

export interface initialAdSliceStatetypes {
  error: boolean;
  status: "idle" | "loading" | "success" | "failed";
  message: string;
  data: {
    newestAds: Array<adFilterTypes>;
    bestSellingAds: Array<adFilterTypes>;
    topAds: adFilterTypes[];
  };
}

const initialState: initialAdSliceStatetypes = {
  error: false,
  status: "idle",
  message: "",
  data: {
    newestAds: [],
    bestSellingAds: [],
    topAds: [],
  },
};

export const createAd = createAsyncThunk(
  "ad/create",
  async (formData: { newData: any; userToken: string }) => {
    const { data } = await axios.post<{ error: boolean; message: string }>(
      `${baseUrl}/adverts/create`,
      formData.newData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${formData.userToken}`,
        },
      }
    );

    return data;
  }
);

export const fetchAdverts = createAsyncThunk("get/ads", async () => {
  const { data } = await axios.get<ResponseDataTypes>(`${baseUrl}/adverts`);

  return data;
});

const AdSlice = createSlice({
  name: "Ad",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createAd.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createAd.fulfilled, (state, action) => {
      if (!action.payload.error) {
        state.status = "success";
        state.error = false;
      } else {
        state.status = "failed";
        state.error = true;
      }
    });
    builder.addCase(createAd.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(fetchAdverts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAdverts.fulfilled, (state, action) => {
      if (action.payload.error) {
        (state.error = true), (state.status = "failed");
      } else {
        state.status = "success";
        (state.error = false), (state.data = action.payload.data);
      }
    });
    builder.addCase(fetchAdverts.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
  },
});

export const getAd = (filter?: string, id?: number) => (state: RootState) => {
  let result;
  switch (filter) {
    case "NEW":
      result = state.Ads.data.newestAds.filter((ad) => ad.id === id);
      break;
    case "BEST":
      result = state.Ads.data.bestSellingAds.filter((best) => best.id === id);
      break;
    case "TOP":
      result = state.Ads.data.topAds.filter((top) => top.id === id);
      break;

    default:
      result = state.Ads.data.bestSellingAds;
      break;
  }

  return result;
};
export const getAds = (state: RootState) => state.Ads;
export const getAllAds = (state: RootState) => [
  ...state.Ads.data.bestSellingAds,
  ...state.Ads.data.newestAds,
  ...state.Ads.data.topAds,
];

export default AdSlice.reducer;
