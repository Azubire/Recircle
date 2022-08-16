import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface stateProps {
  user: {
    userToken: string | null;
    email: string | null;
    password: string | null;
    isLoggedIn: boolean;
  };
}

const initialState: stateProps = {
  user: {
    userToken: null,
    email: null,
    password: null,
    isLoggedIn: false,
  },
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: {
          userToken: string;
          email: string;
          password: string;
          isLoggedIn:boolean
        };
      }>
    ) => {
      state.user = action.payload.user
    },
    removeUser: (state) => {
      state.user = {userToken:null,email:null,password:null,isLoggedIn:false}
    },
  },
});

export const { setUser, removeUser } = AuthSlice.actions;

export const getUser = (state: RootState) => state.currentUser.user;

export default AuthSlice.reducer;
