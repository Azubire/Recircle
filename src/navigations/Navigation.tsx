import React from "react";
import AuthNavigationStack from "./authStack/AuthNavigationStack";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import HomeStack from "./AppStack/AppStack";
import { getUser, setUser } from "../store/features/AuthSlice";
import { getItem, setItem } from "../utils/helpers";
import * as secureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";
import CustomStatusbar from "../components/CustomStatusbar";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";

// keep the splash screen visible until we manually hides it
SplashScreen.preventAutoHideAsync();

const Navigation = () => {
  const [loading, setLoading] = React.useState(false);
  const [appIsReady, setAppIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        //  make any API calls you need to do here

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
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

  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  // const getItem = async (key: string) => {
  //   // setLoading(true);
  //   const results = await secureStore.getItemAsync(key);
  //   console.log("results", results);
  //   if (results) {
  //     dispatch(setUser(JSON.parse(results)));
  //     setLoading(false);
  //   }
  //   setLoading(false);
  // };
  // React.useEffect(() => {
  //   getItem("user");
  // }, []);

  return (
    // <>{currentUser.isLoggedIn ? <HomeStack /> : <AuthNavigationStack />}</>
    // loading ? (
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     <StatusBar />
    //     <ActivityIndicator size="large" />
    //   </View>
    // ) : (
    //   <HomeStack />
    // )
    <HomeStack />
  );
};

export default Navigation;
