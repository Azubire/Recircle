import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const baseUrl = "http://192.168.43.35:3000";
const coverImg = require("../../../assets/images/default_cover.jpg");
const profileImg = require("../../../assets/images/default_user.jpg");
// const profileImg = require("../../../assets/images/");
interface axiosResponse {
  error: boolean;
  message: string;
  data: {
    userToken: string;
    profile: {
      userName: string;
      email: string;
      coverImg: string;
      profileImg: string;
    };
  };
}
interface axiosRequestConfig {
  firstName: string;
  lastName: string;
  email: String;
  password: string;
}

interface signUpFormData {
  email: string;
  password: string;
}

export interface stateProps {
  user: {
    userToken: string;
    profile: {
      userName: string;
      email: string;
      coverImg: string;
      profileImg: string;
    };
  };
  auth: {
    // Multiple possible status enum values
    status: "idle" | "loading" | "success" | "failed";
    error: boolean;
    message: string | undefined;
  };
  defaultImg: {
    coverImg: ImageSourcePropType;
    profileImg: ImageSourcePropType;
  };
}

//thunk actions
export const signUp = createAsyncThunk(
  "auth/signup",
  async (formData: axiosRequestConfig) => {
    const data = await axios.post<axiosResponse>(
      `${baseUrl}/auth/signup`,
      formData
    );

    return data.data;
  }
);

export const signIn = createAsyncThunk(
  "auth/signin",
  async (
    formData: signUpFormData,
    { rejectWithValue }
  ): Promise<axiosResponse> => {
    const { data } = await axios.post<axiosResponse>(
      `${baseUrl}/auth/signin`,
      formData
    );

    return data;
  }
);

const initialState: stateProps = {
  user: {
    userToken: "",
    profile: {
      userName: "",
      email: "",
      coverImg: coverImg,
      profileImg: profileImg,
    },
  },
  auth: {
    status: "idle",
    error: false,
    message: "",
  },
  defaultImg: {
    coverImg: coverImg,
    profileImg: profileImg,
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<stateProps>) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.user = {
        userToken: "",
        profile: {
          userName: "",
          email: "",
          coverImg: "",
          profileImg: "",
        },
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state, action) => {
      state.auth.status = "loading";
    });
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.auth.status = "success";
      // state.user = payload.data;
      if (payload.error) {
        state.auth.error = true;
        state.auth.message = payload.message;
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.auth.status = "failed";
      state.auth.error = true;
      state.auth.message = action.error.message;
    });
    builder.addCase(signIn.pending, (state) => {
      state.auth.status = "loading";
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.auth.error = true;
        state.auth.message = action.payload.message;
        state.auth.status = "failed";
        // state.user.userToken = "";
      } else {
        state.auth.status = "success";
        state.user = action.payload.data;
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.auth.status = "failed";
      state.auth.error = true;
      state.auth.message = action.error.message;
    });
  },
});

export const { setUser, removeUser } = AuthSlice.actions;
/**
 * @param  {RootState} state
 */
export const getUser = (state: RootState) => state.currentUser;

//auth selector
export const getAuth = (state: RootState) => state.currentUser;

export default AuthSlice.reducer;
