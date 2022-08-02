import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import CustomStatusbar from "../components/CustomStatusbar";

const Explore = () => {
  return (
    <View>
      <CustomStatusbar style="dark" />
      <Text>Explore</Text>
    </View>
  );
};

export default Explore;
