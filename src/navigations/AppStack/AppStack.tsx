import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import Details from "../../screens/DetailsScreen";
import Profile from "../../screens/ProfileScreen";
import Home from "../../screens/HomeScreen";
import AppDrawer from "../AppDrawer";

const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <HomeStackNav.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: true }}
    >
      <HomeStackNav.Screen
        options={{ headerShown: false }}
        name="Home"
        component={AppDrawer}
      />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
