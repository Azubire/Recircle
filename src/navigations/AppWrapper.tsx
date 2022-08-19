import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import HomeStack from "./AppStack/AppStack";
import { getUser, setUser } from "../store/features/AuthSlice";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import AuthStack from "./authStack/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { getUserFromSecureStore } from "../utils/helpers";

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
        const user = await getUserFromSecureStore("USERTOKEN");
        // verify userToken

        // dispatch setUser action if user
        if (user) {
          dispatch(setUser(JSON.parse(user)));
        }
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

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        {/* conditionally render app and auth  */}
        {/* {user.userToken ? <HomeStack /> : <AuthStack />} */}
        <HomeStack />
      </NavigationContainer>
    </View>
  );
};

export default AppWrapper;
