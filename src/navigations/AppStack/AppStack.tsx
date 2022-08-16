import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import Details from "../../screens/DetailsScreen";
import Profile from "../../screens/ProfileScreen";
import Home from "../../screens/HomeScreen";
import AppDrawer from "../AppDrawer";
import Categories from "../../screens/Categories";
import Recyclers from "../../screens/Recyclers";
import MyAds from "../../screens/MyAds";
import { useTheme } from "react-native-paper";
import RecyclerStack from "../RecyclersStack";
import Menu from "../../screens/Menu";
import AdDetails from "../../screens/AdDetails";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.light,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={AppDrawer}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen
        name="RecyclersStack"
        options={{ headerTitle: "Recyclers", headerShown: false }}
        component={RecyclerStack}
      />
      <Stack.Screen name="MyAds" component={MyAds} />
      <Stack.Screen
        name="AdDetails"
        component={AdDetails}
        options={{ headerTitle: "Ad Details" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
