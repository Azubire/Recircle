import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import HomeStack from "./src/navigations/AppStack/AppStack";
import Navigation from "./src/navigations/Navigation";
import store from "./src/store";

import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { useAppDispatch } from "./src/hooks/reduxhooks";

SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#14532d",
    secondary: "#f97316",
    tertiary: "#a1b2c3",
    success: "#22c55e",
    info: "#0ea5e9",
    light: "#FFFFFF",
    dark: "#000000",
    darkText: "#27272a",
    lightText: "#FFFFFF",
    danger: "#f43f5e",
    gray: "#71717a",
  },
};

export type ThemeOverride = typeof theme;

// main app
export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function prepare() {
      try {
        // get user token from localStorage
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
      <ReduxProvider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <HomeStack />
          </NavigationContainer>
        </PaperProvider>
      </ReduxProvider>
    </View>
  );
}
