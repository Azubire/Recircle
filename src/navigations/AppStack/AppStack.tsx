import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import Home from "../../screens/HomeScreen";
import Details from "../../screens/DetailsScreen";
import SettingsStack from "../SettingStack/SettingsStack";
import AppTabs from "../appTabs/AppTabs";
import AppDrawer from "../AppDrawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../../screens/ProfileScreen";
import Settings from "../../screens/SettingsScreen";

const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={AppTabs}
      />
      <HomeStackNav.Screen name="Details" component={Details} />
      {/* <HomeStackNav.Screen name="Settings" component={Settings} /> */}
      <HomeStackNav.Screen name="Profile" component={Profile} />
    </HomeStackNav.Navigator>
  );
};

export default HomeStack;
