import { View } from "react-native";
import React from "react";
import Center from "../components/Center";
import { Text } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import CustomStatusbar from "../components/CustomStatusbar";

const Details: React.FC<HomeStackScreenProps<"Details">> = ({ navigation }) => {
  return (
    <Center>
      <CustomStatusbar style="light" />
      <Text>Details Screen</Text>
    </Center>
  );
};

export default Details;
