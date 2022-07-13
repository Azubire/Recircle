import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    currentUser: UserReducer,
  },
});

export default store;
