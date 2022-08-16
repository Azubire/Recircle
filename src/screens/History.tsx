import { View, Text } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";

const History = ({ navigation }: AppDrawerScreenProps<"History">) => {
  return (
    <View>
      <CustomStatusbar style="light" />
      <Text>History</Text>
    </View>
  );
};

export default History;
