import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParamList } from "./types";
import AppDrawer from "../AppDrawer";
import Categories from "../../screens/Categories";
import MyAds from "../../screens/MyAds";
import { useTheme } from "react-native-paper";
import RecyclerStack from "../RecyclersStack";
import AdDetails from "../../screens/AdDetails";
import BecomeRecycler from "../../screens/BecomeRecycler";
import NotificationDetails from "../../screens/NotificationDetails";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.light,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Drawer"
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
      <Stack.Screen
        name="BecomeRecycler"
        component={BecomeRecycler}
        options={{ headerTitle: "Become A Recycler" }}
      />
      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{ headerTitle: "Messages" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
