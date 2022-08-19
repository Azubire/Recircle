import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const coverImg = require("../../../assets/images/cover.jpeg");
const profileImg = require("../../../assets/images/profile.jpeg");

export interface stateProps {
  user: {
    userToken: string | undefined;
    profile: {
      userName: string | undefined;
      email: string | undefined;
      coverImg?: ImageSourcePropType | undefined;
      profileImg?: ImageSourcePropType | undefined;
    };
  };
  auth?: {
    // Multiple possible status enum values
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | undefined;
  };
}

const initialState: stateProps = {
  user: {
    userToken: undefined,
    profile: {
      userName: undefined,
      email: undefined,
      coverImg: undefined,
      profileImg: undefined,
    },
  },
  auth: {
    status: "idle",
    error: undefined,
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
        userToken: undefined,
        profile: {
          userName: undefined,
          email: undefined,
        },
      };
    },
  },
});

export const { setUser, removeUser } = AuthSlice.actions;
/**
 * @param  {RootState} state
 */
export const getUser = (state: RootState) => state.currentUser;

export default AuthSlice.reducer;
