import { View } from "react-native";
import React from "react";
import Center from "../components/Center";
import { Text } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/HomeStack/types";

const Details: React.FC<HomeStackScreenProps<"Details">> = () => {
  return (
    <Center>
      <Text>DetailsScreen</Text>
    </Center>
  );
};

export default Details;
