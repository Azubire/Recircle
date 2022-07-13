import { View, Text } from "react-native";
import React from "react";
import Center from "../components/Center";
import { Button } from "react-native-paper";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  AuthScreenProps,
  AuthStackParamList,
} from "../navigations/authStack/types";

const SigninScreen = () => {
  const navigation =
    useNavigation<NavigationProp<AuthStackParamList, "Signin">>();

  return (
    <Center>
      <Text>SigninScreen</Text>
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Signup", {
            id: 1,
          });
        }}
      >
        Signup
      </Button>
    </Center>
  );
};

export default SigninScreen;
