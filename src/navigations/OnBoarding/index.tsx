import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../../screens/WelcomeScreen";

const Stack = createNativeStackNavigator();

const OnBoardingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
};

export default OnBoardingStack;
