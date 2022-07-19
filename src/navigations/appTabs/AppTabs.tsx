import React, { Component, ReactElement } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeStack from "../AppStack/AppStack";
import SettingsStack from "../SettingStack/SettingsStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Pressable,
  StatusBar,
  Text,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import RenderIcon from "../../components/RenderIcon";
import AppDrawer from "../AppDrawer";
import Home from "../../screens/HomeScreen";
import Settings from "../../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, navigation, descriptors }: any) => {
  return (
    <HStack bg="indigo.600" alignItems="center" safeAreaBottom shadow={6}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <Pressable
            key={index}
            opacity={isFocused ? 1 : 0.5}
            py="3"
            flex={1}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Center>
              {<RenderIcon name={route.name} isFocused={isFocused} />}
              <Text color="white" fontSize="12">
                {label}
              </Text>
            </Center>
          </Pressable>
        );
      })}
    </HStack>
  );
};

function AppBar({ navigation, route }) {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg="#6200ee"
        px="1"
        py="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <IconButton
            icon={
              <Icon
                size="lg"
                as={MaterialIcons}
                onPress={() => {
                  navigation.toggleDrawer();
                }}
                name="menu"
                color="white"
              />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            {route.name}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            icon={<Icon as={MaterialIcons} name="favorite" color="white" />}
          />
          <IconButton
            icon={<Icon as={MaterialIcons} name="search" color="white" />}
          />
          <IconButton
            icon={<Icon as={MaterialIcons} name="more-vert" color="white" />}
          />
        </HStack>
      </HStack>
    </>
  );
}

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      // screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Lets Recycle"
        options={{ tabBarLabel: "Dashboard" }}
        component={Home}
      />
      <Tab.Screen
        name="Settings"
        options={{ tabBarLabel: "Settings" }}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;
