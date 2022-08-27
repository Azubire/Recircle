import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import HomeStack from "./AppStack/AppStack";
import {
  getUser,
  setUser,
  signIn,
  verifyToken,
  verifyTokenData,
} from "../store/features/AuthSlice";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./authStack/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { getUserFromSecureStore, setUserToSecureStore } from "../utils/helpers";
import store from "../store";
import { fetchRecyclingCategories } from "../store/features/RecyclingCategorySlice";

// keep the splash screen visible until we manually hides it
SplashScreen.preventAutoHideAsync();

const AppWrapper = () => {
  const [appIsReady, setAppIsReady] = React.useState(false);

  const dispatch = useAppDispatch();
  // get user from store
  const { user } = useAppSelector(getUser);

  React.useEffect(() => {
    async function prepare() {
      try {
        // get user token from localStorage
        const userToken = await getUserFromSecureStore("USERTOKEN");
        // verify userToken
        // console.log("local user", JSON.parse(userToken));

        // dispatch setUser action if user
        if (userToken) {
          const payload: verifyTokenData = JSON.parse(userToken);
          // console.log("user in if state", typeof payload.email);

          const data = await dispatch(
            verifyToken({ email: payload.email, userToken: payload.userToken })
          ).unwrap();
          // console.log(data);
          if (!data.error && data.data) {
            setUserToSecureStore({
              key: "USERTOKEN",
              payload: {
                userToken: data.data.userToken,
                email: data.data.profile.email,
              },
            });
          }
        }
      } catch (e) {
        console.warn(e);
        console.log("no token");
      } finally {
        // Tell the application to render
        store.dispatch(fetchRecyclingCategories());
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {/* conditionally render app and auth  */}
        {user.userToken ? <HomeStack /> : <AuthStack />}
        {/* <AuthStack /> */}
        {/* <HomeStack /> */}
      </NavigationContainer>
    </View>
  );
};

export default AppWrapper;
