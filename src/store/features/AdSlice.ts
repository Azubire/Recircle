import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { useAppSelector } from "../../hooks/reduxhooks";
import Search from "../../screens/Search";
import { formData } from "../../screens/Sell";
import { getAuth } from "./AuthSlice";

const plastic1 = require("../../../assets/images/Ads/plastic1.jpg");
const plastic2 = require("../../../assets/images/Ads/plastic2.jpg");
const plastic3 = require("../../../assets/images/Ads/plastic3.webp");
const plastic4 = require("../../../assets/images/Ads/plastic4.webp");
const plastic5 = require("../../../assets/images/Ads/plastic5.jpg");

const glass1 = require("../../../assets/images/Ads/glass1.jpg");

const cans1 = require("../../../assets/images/Ads/cans1.webp");
const cans2 = require("../../../assets/images/Ads/cans2.jpg");
const cans3 = require("../../../assets/images/Ads/cans3.jpg");
const cans4 = require("../../../assets/images/Ads/cans4.webp");

const baseUrl = "http://192.168.43.35:3001";

export interface Response {
  error: boolean;
  message: string;
  data: {
    id: number;
    title: string;
    desc: string;
    img: ImageSourcePropType;
    category: string;
    price: string;
    date: string;
    time: string;
    status: "Pending" | "Completed" | "Rejected";
  }[];
}
export interface adFilterTypes {
  id: number;
  title: string;
  desc: string;
  img: ImageSourcePropType;
  category: string;
  price: string;
  date: string;
  time: string;
  status: "Pending" | "Completed" | "Rejected";
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
    newestAds: [
      {
        id: 1,
        title: "65Kg of plastic",
        desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Plastic",
        img: plastic2,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Completed",
      },
      {
        id: 2,
        title: "79Kg of glass",
        desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
        category: "Glass",
        img: glass1,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Pending",
      },
      {
        id: 3,
        title: "40Kg of cans",
        desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Cans",
        img: cans4,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Rejected",
      },
    ],
    bestSellingAds: [
      {
        id: 4,
        title: "58Kg of plastic",
        desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Plastic",
        img: plastic1,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Completed",
      },
      {
        id: 5,
        title: "80Kg of plastic",
        desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Plastic",
        img: plastic4,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Pending",
      },
      {
        id: 6,
        title: "79Kg of cans",
        desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
        category: "Cans",
        img: cans1,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Rejected",
      },
      {
        id: 7,
        title: "40Kg of cans",
        desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Cans",
        img: cans2,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Completed",
      },
    ],
    topAds: [
      {
        id: 8,
        title: "58Kg of glass",
        desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Glass",
        img: glass1,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Pending",
      },
      {
        id: 9,
        title: "79Kg of cans",
        desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
        category: "Cans",
        img: cans3,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Rejected",
      },
      {
        id: 10,
        title: "40Kg of plastic",
        desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
        category: "Plastic",
        img: plastic5,
        price: "50",
        date: "2nd Sep 2022",
        time: "12 : 05 Pm",
        status: "Completed",
      },
    ],
  },
};

export const createAd = createAsyncThunk(
  "ad/create",
  async (formData: { newData: any; userToken: string }) => {
    const { data } = await axios.post<Response>(
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
  },
});

export const getNewestAds = (state: RootState) => state.Ads.data.newestAds;
export const getBestSellingAds = (state: RootState) =>
  state.Ads.data.bestSellingAds;
export const getTopAds = (state: RootState) => state.Ads.data.topAds;

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
