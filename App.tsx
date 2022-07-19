import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Center from "./src/components/Center";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigationStack from "./src/navigations/authStack/AuthNavigationStack";
import BottomTabs from "./src/navigations/appTabs/AppTabs";

import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import { NativeBaseProvider, extendTheme } from "native-base";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./src/navigations/AppStack/AppStack";
import RootStack from "./src/navigations/RootStack/RootStack";
import AppDrawer from "./src/navigations/AppDrawer";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <PaperProvider>
          <NavigationContainer>
            {/* <Root.Screen name="Auth" component={AuthNavigationStack} /> */}
            <AppDrawer />
          </NavigationContainer>
        </PaperProvider>
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
