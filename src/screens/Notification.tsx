import { View, Text } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";

const Notification = ({ navigation }: AppDrawerScreenProps<"Notification">) => {
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
};

export default Notification;
