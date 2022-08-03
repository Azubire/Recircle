import { View, Text } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";

const Sell = ({ route }: TabScreenProps<"Sell">) => {
  const { id } = route.params;

  return (
    <View>
      <Text>Sell</Text>
      <Text>Category id: {id}</Text>
    </View>
  );
};

export default Sell;
