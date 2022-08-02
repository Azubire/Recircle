import { View, Text } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import { Button } from "react-native-paper";

const Search = ({ navigation }: TabScreenProps<"Search">) => {
  return (
    <View>
      <Text>Search</Text>
      <Button
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        click me
      </Button>
    </View>
  );
};

export default Search;
