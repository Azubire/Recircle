import { View, Text } from "react-native";
import React from "react";
import Center from "../components/Center";
import { NavigationProp } from "@react-navigation/native";
import { screenParamList } from "../navigations/SettingStack/types";
import { Button } from "native-base";

const Settings: React.FC<screenParamList<"Setting">> = ({ navigation }) => {
  return (
    <Center>
      <Text>Settings Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
        rounded={"lg"}
        width="32"
      >
        Profile
      </Button>
    </Center>
  );
};

export default Settings;
