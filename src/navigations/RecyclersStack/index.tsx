import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recyclers from "../../screens/Recyclers";
import RecyclerDetails from "../../screens/RecyclerDetails";
import { RecyclerStackParamList } from "./types";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator<RecyclerStackParamList>();

const RecyclerStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.light,
      }}
    >
      <Stack.Screen name="Recyclers" component={Recyclers} />
      <Stack.Screen
        options={({ route }) => ({ title: route.params.name })}
        name="RecyclerDetails"
        component={RecyclerDetails}
      />
    </Stack.Navigator>
  );
};

export default RecyclerStack;
