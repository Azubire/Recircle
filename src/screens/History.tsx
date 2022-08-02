import { View, Text } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";

const History = ({ navigation }: AppDrawerScreenProps<"History">) => {
  return (
    <View>
      <Text>History</Text>
    </View>
  );
};

export default History;
