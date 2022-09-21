import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/AuthSlice";
import RecyclerReducer from "./features/RecyclerSclice";
import AdReducer from "./features/AdSlice";
import HomeCategoryReducer from "./features/HomeCategorySlice";
import NotificationReducer from "./features/NotificationSlice";
import RecyclingCategoryReducer from "./features/RecyclingCategorySlice";
import UserAdsReducer from "./features/UserAds";

const store = configureStore({
  reducer: {
    currentUser: AuthReducer,
    Recycler: RecyclerReducer,
    Ads: AdReducer,
    HomeCategory: HomeCategoryReducer,
    Notification: NotificationReducer,
    RecyclingCategory: RecyclingCategoryReducer,
    UserAds: UserAdsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
