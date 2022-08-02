import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "./types";
import SigninScreen from "../../screens/SigninScreen";
import SignupScreen from "../../screens/SignupScreen";

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigationStack = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Signin"
      screenOptions={{ headerShown: true }}
    >
      <AuthStack.Screen name="Signin" component={SigninScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigationStack;
