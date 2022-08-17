import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageSourcePropType } from "react-native";
import { RootState } from "..";

const coverImg = require("../../../assets/images/cover.jpeg");
const profileImg = require("../../../assets/images/profile.jpeg");

export interface stateProps {
  user: {
    userToken: string | null;
    userName: string | null;
    img: {
      coverImg: ImageSourcePropType;
      profileImg: ImageSourcePropType;
    };
    email: string | null;
    password: string | null;
    isLoggedIn: boolean;
  };
}

const initialState: stateProps = {
  user: {
    userToken: null,
    userName: "John Doe",
    img: { coverImg: coverImg, profileImg: profileImg },
    email: "johndoe@gmail.com",
    password: null,
    isLoggedIn: false,
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
        ...state.user,
        userToken: null,
        userName: null,
        email: null,
        password: null,
        isLoggedIn: false,
      };
    },
  },
});

export const { setUser, removeUser } = AuthSlice.actions;

export const getUser = (state: RootState) => state.currentUser.user;

export default AuthSlice.reducer;
