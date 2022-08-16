import { createSlice } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

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

interface adFilterTypes {
  id: number;
  title: string;
  desc: string;
  img: ImageSourcePropType;
  price: string;
  date: string;
  time: string;
}

interface initialStatetypes {
  newestAds: adFilterTypes[];
  bestSellingAds: adFilterTypes[];
  topAds: adFilterTypes[];
}

const initialState: initialStatetypes = {
  newestAds: [
    {
      id: 1,
      title: "58Kg of plastic",
      desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
      img: plastic2,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 2,
      title: "79Kg of glass",
      desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
      img: glass1,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 3,
      title: "40Kg of cans",
      desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
      img: cans4,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
  ],
  bestSellingAds: [
    {
      id: 1,
      title: "58Kg of plastic",
      desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
      img: plastic1,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 2,
      title: "80Kg of plastic",
      desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
      img: plastic4,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 3,
      title: "79Kg of cans",
      desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
      img: cans1,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 4,
      title: "40Kg of cans",
      desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
      img: cans2,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
  ],
  topAds: [
    {
      id: 1,
      title: "58Kg of glass",
      desc: "I have gathered 58Kg of plastic waste from my kitchen and i'm willing to sell this to save the planet",
      img: glass1,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 2,
      title: "79Kg of cans",
      desc: "I have gathered 79Kg of glass from my kitchen and i'm willing to sell this to save the planet",
      img: cans3,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
    {
      id: 3,
      title: "40Kg of plastic",
      desc: "I have gathered 40Kg of cans waste from my kitchen and i'm willing to sell this to save the planet",
      img: plastic5,
      price: "50",
      date: "2nd Sep 2022",
      time: "12 : 05 Pm",
    },
  ],
};

const AdSlice = createSlice({
  name: "Ad",
  initialState,
  reducers: {},
});

export const getNewestAds = (state: RootState) => state.Ads.newestAds;
export const getBestSellingAds = (state: RootState) => state.Ads.bestSellingAds;
export const getTopAds = (state: RootState) => state.Ads.topAds;

export default AdSlice.reducer;
