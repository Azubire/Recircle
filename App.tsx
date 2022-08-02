import { StatusBar } from "expo-status-bar";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";
import AppDrawer from "./src/navigations/AppDrawer";
import HomeStack from "./src/navigations/AppStack/AppStack";

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

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {/* <Root.Screen name="Auth" component={AuthNavigationStack} /> */}
          <HomeStack />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}
