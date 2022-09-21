import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";
import { baseUrl } from "../../utils/helpers";

const coverImg = require("../../../assets/images/default_cover.jpg");
const profileImg = require("../../../assets/images/default_user.jpg");
interface axiosResponse {
  error: boolean;
  message: string;
  data: {
    userToken: string;
    profile: {
      id: number;
      userName: string;
      email: string;
      coverImg: ImageSourcePropType | undefined;
      profileImg: ImageSourcePropType | undefined;
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
export interface verifyTokenData {
  userToken: string;
  email: string;
}

export interface stateProps {
  user: {
    userToken: string;
    profile: {
      id: number;
      userName: string;
      email: string;
      coverImg?: ImageSourcePropType | undefined;
      profileImg?: ImageSourcePropType | undefined;
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

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (asyncData: verifyTokenData): Promise<axiosResponse> => {
    // console.log("thunk", asyncData);
    const { data } = await axios.post<axiosResponse>(
      `${baseUrl}/auth/verifytoken`,
      {
        email: asyncData.email,
      },
      {
        headers: { Authorization: `Bearer ${asyncData.userToken}` },
      }
    );

    return data;
  }
);

export const updateProfileImage = createAsyncThunk(
  "profile/update",
  async (formData: { id: number; image: any }) => {
    const { data } = await axios.put<{
      error: boolean;
      message: string;
      image: ImageSourcePropType;
    }>(`${baseUrl}/users/update/${formData.id}`, formData.image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  }
);

const initialState: stateProps = {
  user: {
    userToken: "",
    profile: {
      id: -1,
      userName: "",
      email: "",
      coverImg: undefined,
      profileImg: undefined,
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
          id: -1,
          userName: "",
          email: "",
          coverImg: undefined,
          profileImg: undefined,
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
    builder.addCase(verifyToken.rejected, (state, action) => {
      state.user.userToken = "";
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.user.userToken = "";
      } else {
        state.user = action.payload.data;
      }
    });
    builder.addCase(updateProfileImage.fulfilled, (state, action) => {
      state.user.profile.profileImg = action.payload.image;
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
