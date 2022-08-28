import { SafeAreaView, View } from "react-native";
import React from "react";
import Center from "../components/Center";
import { NavigationProp } from "@react-navigation/native";
import { screenParamList } from "../navigations/SettingStack/types";
import { Button, Text } from "react-native-paper";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";

const Settings = ({ navigation }: AppDrawerScreenProps<"Settings">) => {
  return (
    <SafeAreaView>
      <CustomStatusbar style="light" />
      <></>
    </SafeAreaView>
  );
};

export default Settings;
