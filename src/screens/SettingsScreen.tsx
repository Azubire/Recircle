import { View } from "react-native";
import React from "react";
import Center from "../components/Center";
import { NavigationProp } from "@react-navigation/native";
import { screenParamList } from "../navigations/SettingStack/types";
import { Button, Text } from "react-native-paper";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";

const Settings = ({ navigation }: AppDrawerScreenProps<"Settings">) => {
  return (
    <Center>
      <Text variant="headlineLarge">Settings Screen</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        Click me
      </Button>
    </Center>
  );
};

export default Settings;
