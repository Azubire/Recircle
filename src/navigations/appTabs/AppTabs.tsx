import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../../screens/HomeScreen";
import Settings from "../../screens/SettingsScreen";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { TabParamList } from "./types";
import Explore from "../../screens/Explore";
import Sell from "../../screens/Sell";
import Search from "../../screens/Search";
import Profile from "../../screens/ProfileScreen";
import { Avatar, useTheme } from "react-native-paper";
import HomeStack from "../AppStack/AppStack";
const profileImage = require("../../../assets/images/azubire.jpg");

const Tab = createBottomTabNavigator<TabParamList>();

const AppTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ navigation, route }) => {
        return {
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.light,
          tabBarStyle: { height: 60 },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarHideOnKeyboard: true,
        };
      }}
    >
      <Tab.Screen
        name="Home"
        options={({ navigation }) => ({
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "home" : "home"}
                size={30}
                color={color}
              />
            );
          },
          headerShown: true,
          headerLeft: (props) => (
            <TouchableOpacity
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <MaterialCommunityIcons name="menu" size={25} color="#fff" />
            </TouchableOpacity>
          ),
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerRightContainerStyle: { paddingRight: 15 },

          headerRight: () => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 70,
                }}
              >
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="bell-badge-outline"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            );
          },
        })}
        component={Home}
      />
      <Tab.Screen
        name="Explore"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <MaterialCommunityIcons
                name={focused ? "compass-rose" : "compass-rose"}
                size={30}
                color={color}
              />
            );
          },
          // tabBarStyle: { display: "none" },
          headerStyle: { backgroundColor: colors.info },
        }}
        component={Explore}
      />
      <Tab.Screen
        name="Sell"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "pluscircle" : "pluscircle"}
                size={45}
                color={focused ? colors.primary : colors.secondary}
              />
            );
          },
          // tabBarStyle: { display: "none" },
          headerTitle: "Create an ad",
        }}
        component={Sell}
      />
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon({ focused, color, size }) {
            return (
              <AntDesign
                name={focused ? "search1" : "search1"}
                size={30}
                color={color}
              />
            );
          },
          // tabBarStyle: { display: "none" },
        }}
        component={Search}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon({ focused, color, size }) {
            return <Avatar.Image size={30} source={profileImage} />;
          },
          // tabBarStyle: { display: "none" },
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
