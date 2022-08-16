import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { useAppSelector } from "../../hooks/reduxhooks";
const img1 = require("../../../assets/images/r1.jpg");
const img2 = require("../../../assets/images/r2.jpg");
const img3 = require("../../../assets/images/r3.jpg");

export interface initialStateTypes {
  id: number;
  name: string;
  motto: string;
  profile: string;
  img: ImageSourcePropType;
  buyingCategory: Array<string>;
  joinedDate: string;
  workingHours: string;
  workingDays: string;
  location: string;
  verified: boolean;
  ratings: number;
}

const initialState: initialStateTypes[] = [
  {
    id: 1,
    name: "Caressona Ldt",
    motto: "we are the best",
    profile:
      "We are focused on recycling waste products to bring out something meaningful to the environment. We are focused on recycling waste products to bring out something meaningful to the environment.      We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.",
    img: img1,
    buyingCategory: ["Glass", "Platic", "Paper"],
    joinedDate: "3rd Jun 2022",
    workingHours: "6am - 6pm",
    workingDays: "Mon - Fri",
    location: "Accra Tema",
    verified: true,
    ratings: 122,
  },
  {
    id: 2,
    name: "My-Waist Recycle Ldt",
    motto: "Bring your material to us",
    profile:
      "We collect all kind of waste material from you no matter your location. Just make your offer.",
    img: img2,
    buyingCategory: ["Paper", "Iron & Wood", "Paper"],
    joinedDate: "3rd Jun 2022",
    workingHours: "8am - 4pm",
    workingDays: "Mon - Fri",
    location: "Kumasi Adom",
    verified: false,
    ratings: 122,
  },
  {
    id: 3,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect ",
    img: img3,
    buyingCategory: ["Platicc", "Paper", "Iron & Wood", "Glass"],
    joinedDate: "3rd Jun 2022",
    workingHours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
  {
    id: 4,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.",
    img: img3,
    buyingCategory: [
      "Plastic",
      "Paper",
      "Platic",
      "Paper",
      "Iron & Wood",
      "Platic",
      "Paper",
    ],
    joinedDate: "3rd Jun 2022",
    workingHours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
];

const RecyclerSlice = createSlice({
  name: "Recycler",
  initialState,
  reducers: {
    allRecyclers: () => {},
  },
});

export const { allRecyclers } = RecyclerSlice.actions;

export const getAllRecyclers = (state: RootState) => state.Recycler;
export const getRecycler = (id: number) => (state: RootState) =>
  state.Recycler.filter((recycler) => recycler.id === id);

export const getSearchResults = (searchTerm: string) => (state: RootState) => {
  const res = state.Recycler.map((item) => item.name.includes(searchTerm));

  // state.Recycler.filter(item=>item.)
  return res;
};

export default RecyclerSlice.reducer;
