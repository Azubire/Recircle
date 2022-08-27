import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppState, ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { useAppSelector } from "../../hooks/reduxhooks";
const img1 = require("../../../assets/images/r1.jpg");
const img2 = require("../../../assets/images/r2.jpg");
const img3 = require("../../../assets/images/r3.jpg");
const baseUrl = "http://192.168.43.35:3001";

export interface ResponseType {
  error: boolean;
  message: string;
  data: {
    id: number;
    companyName: string;
    about: string;
    profile: string;
    profileImg: string;
    RecyclingCategory: { id: number; name: string; icon: string };
    createdAt: string;
    workingHours: string;
    workingDays: string;
    location: string;
    isVerified: boolean;
    ratings: number;
  }[];
}
export interface initialStateTypes {
  id: number;
  companyName: string;
  about: string;
  profile: string;
  profileImg: string;
  RecyclingCategory: { id: number; name: string; icon: string };
  createdAt: string;
  workingHours: string;
  workingDays: string;
  location: string;
  isVerified: boolean;
  ratings: number;
}

type RecyclerTypes = {
  error: boolean;
  message: string;
  status: "idle" | "loading" | "success" | "failed";
  data: initialStateTypes[];
};

const initialState: RecyclerTypes = {
  error: false,
  message: "",
  status: "idle",
  data: [],
};

//get recyclers thunk
export const fetchRecylers = createAsyncThunk(
  "get/recyclers",
  async (userToken: string) => {
    const { data } = await axios.get<ResponseType>(`${baseUrl}/recyclers`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return data;
  }
);
interface CreateRecyclerResponse {
  error: boolean;
  message: string;
}

export const createRecycler = createAsyncThunk(
  "recyclers/create",
  async (formData: { newData: any; userToken: string }) => {
    const { data } = await axios.post<CreateRecyclerResponse>(
      `${baseUrl}/recyclers/create`,
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

// export cons

const RecyclerSlice = createSlice({
  name: "Recycler",
  initialState,
  reducers: {
    allRecyclers: () => {},
  },
  extraReducers(builder) {
    builder.addCase(fetchRecylers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchRecylers.fulfilled, (state, action) => {
      if (action.payload.error) {
        (state.status = "failed"), (state.error = true);
      } else {
        (state.status = "success"), (state.error = false);
        state.data = action.payload.data;
      }
    });
    builder.addCase(fetchRecylers.rejected, (state) => {
      state.status = "failed";
      state.error = true;
    });
    builder.addCase(createRecycler.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createRecycler.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.status = "failed";
        state.error = true;
      } else {
        state.status = "success";
        state.error = false;
      }
    });
  },
});

export const { allRecyclers } = RecyclerSlice.actions;

export const getAllRecyclers = (state: RootState) => state.Recycler;
export const getRecycler = (id: number) => (state: RootState) =>
  state.Recycler.data.filter((recycler) => recycler.id === id);

export const getSearchResults = (searchTerm: string) => (state: RootState) => {
  const res = state.Recycler.data.map((item) =>
    item.companyName.includes(searchTerm)
  );

  // state.Recycler.filter(item=>item.)
  return res;
};

export default RecyclerSlice.reducer;

//  {
//     id: 1,
//     name: "Caressona Ldt",
//     motto: "we are the best",
//     profile:
//       "We are focused on recycling waste products to bring out something meaningful to the environment. We are focused on recycling waste products to bring out something meaningful to the environment.      We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.We are focused on recycling waste products to bring out something meaningful to the environment.",
//     img: img1,
//     buyingCategory: ["Glass", "Platic", "Paper"],
//     joinedDate: "3rd Jun 2022",
//     workingHours: "6am - 6pm",
//     workingDays: "Mon - Fri",
//     location: "Accra Tema",
//     verified: true,
//     ratings: 122,
//   },
//   {
//     id: 2,
//     name: "My-Waist Recycle Ldt",
//     motto: "Bring your material to us",
//     profile:
//       "We collect all kind of waste material from you no matter your location. Just make your offer.",
//     img: img2,
//     buyingCategory: ["Paper", "Iron & Wood", "Paper"],
//     joinedDate: "3rd Jun 2022",
//     workingHours: "8am - 4pm",
//     workingDays: "Mon - Fri",
//     location: "Kumasi Adom",
//     verified: false,
//     ratings: 122,
//   },
//   {
//     id: 3,
//     name: "North-Bridge Collector",
//     motto: "we collect them all",
//     profile:
//       "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.We aim to protect ",
//     img: img3,
//     buyingCategory: ["Platicc", "Paper", "Iron & Wood", "Glass"],
//     joinedDate: "3rd Jun 2022",
//     workingHours: "7am - 5pm",
//     workingDays: "Mon - Fri",
//     location: "Bolgatanga Soe",
//     verified: true,
//     ratings: 122,
//   },
//   {
//     id: 4,
//     name: "North-Bridge Collector",
//     motto: "we collect them all",
//     profile:
//       "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.",
//     img: img3,
//     buyingCategory: [
//       "Plastic",
//       "Paper",
//       "Platic",
//       "Paper",
//       "Iron & Wood",
//       "Platic",
//       "Paper",
//     ],
//     joinedDate: "3rd Jun 2022",
//     workingHours: "7am - 5pm",
//     workingDays: "Mon - Fri",
//     location: "Bolgatanga Soe",
//     verified: true,
//     ratings: 122,
//   },
