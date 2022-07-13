import { View, Text } from "react-native";
import React from "react";
import Center from "../components/Center";
import {
  AuthScreenProps,
  AuthStackParamList,
} from "../navigations/authStack/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Button } from "react-native-paper";

const SignupScreen: React.FC<AuthScreenProps<"Signup">> = ({
  navigation,
  route,
}) => {
  return (
    <Center>
      <Text>SignupScreen</Text>
      <Text>{route.params.id}</Text>
      <Button
        onPress={() => {
          navigation.navigate("Signin", {
            id: 2,
          });
        }}
      >
        sign in
      </Button>
    </Center>
  );
};

export default SignupScreen;
