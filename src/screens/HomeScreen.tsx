import React from "react";
import Center from "../components/Center";
import { Button, Text } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/HomeStack/types";

const Home: React.FC<HomeStackScreenProps<"Home">> = ({ navigation }) => {
  return (
    <Center>
      <Text>Welcome Home</Text>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate("Details");
        }}
      >
        go to details
      </Button>
    </Center>
  );
};

export default Home;
