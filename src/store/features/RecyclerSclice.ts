import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";
import { baseUrl } from "../../utils/helpers";

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
  const res = state.Recycler.data.filter(
    (item) => item.companyName == searchTerm
  );

  // state.Recycler.filter(item=>item.)
  return res;
};

export default RecyclerSlice.reducer;
