import { StatusBar } from "expo-status-bar";
//navigatonContainer
import { NavigationContainer } from "@react-navigation/native";

import { NativeBaseProvider, extendTheme } from "native-base";

import { Provider as ReduxProvider } from "react-redux";
import store from "./src/store";
import AppDrawer from "./src/navigations/AppDrawer";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          {/* <Root.Screen name="Auth" component={AuthNavigationStack} /> */}
          <AppDrawer />
        </NavigationContainer>
      </NativeBaseProvider>
    </ReduxProvider>
  );
}
