import { View } from "react-native";
import React from "react";
import Center from "../components/Center";
import { Text } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { Button } from "native-base";

const Details: React.FC<HomeStackScreenProps<"Details">> = ({ navigation }) => {
  return (
    <Center>
      <Text>Details Screen</Text>
      <Button
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        Go Back
      </Button>
    </Center>
  );
};

export default Details;
