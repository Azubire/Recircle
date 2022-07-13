import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Center from "./src/components/Center";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./src/navigations/authStack/AuthNavigationStack";
import BottomTabs from "./src/navigations/appTabs/BottomTabs";

import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

export default function App() {
  return (
    <ReduxProvider store={store}>
      {/*// @ts-ignore */}
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <AuthNavigationStack />
          {/* <BottomTabs /> */}
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
