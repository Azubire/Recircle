import React, { useEffect } from "react";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import Settings from "../../screens/SettingsScreen";
import AppTabs from "../appTabs/AppTabs";
import { Drawer as PaperDrawer, useTheme } from "react-native-paper";
import { DrawerParamList } from "./Types";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import DrawerContent from "../../components/DrawerContent";
import History from "../../screens/History";
import AboutUS from "../../screens/AboutUS";
import ContactUs from "../../screens/ContactUs";
import Notification from "../../screens/Notification";
import { StatusBar } from "expo-status-bar";

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppDrawer = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={({
        navigation,
        route,
      }: DrawerScreenProps<DrawerParamList>) => {
        // console.log("------->>>", sta te.);

        return {
          headerLeft: (props) => (
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color={colors.light}
              />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.light,
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerRightContainerStyle: { paddingRight: 15 },
        };
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        options={{ headerShown: false }}
        name="Dashboard"
        component={AppTabs}
      />
      <Drawer.Screen
        options={{ drawerLabel: "History" }}
        name="History"
        component={History}
      />
      <Drawer.Screen
        options={{ drawerLabel: "About Us", headerTitle: "About Us" }}
        name="AboutUs"
        component={AboutUS}
      />
      <Drawer.Screen
        options={{ drawerLabel: "Contact Us", headerTitle: "Contact Us" }}
        name="ContactUs"
        component={ContactUs}
      />
      <Drawer.Screen
        options={{ drawerLabel: "Notifications" }}
        name="Notifications"
        component={Notification}
      />
      <Drawer.Screen
        options={{ drawerLabel: "Settings" }}
        name="Settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawer;
