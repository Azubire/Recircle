import { View, Text } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";

const Notification = ({
  navigation,
}: AppDrawerScreenProps<"Notifications">) => {
  return (
    <View>
      <CustomStatusbar style="light" />
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
