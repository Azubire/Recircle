import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./features/userSlice";
import AuthReducer from "./features/AuthSlice";
import RecyclerReducer from "./features/RecyclerSclice";
import AdReducer from "./features/AdSlice";
import HomeCategoryReducer from "./features/HomeCategorySlice";

const store = configureStore({
  reducer: {
    currentUser: AuthReducer,
    Recycler: RecyclerReducer,
    Ads: AdReducer,
    HomeCategory: HomeCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
