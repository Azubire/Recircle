import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import CustomStatusbar from "../components/CustomStatusbar";

const ContactUs = () => {
  return (
    <View>
      <CustomStatusbar style="light" />
      <Text>Contact Us</Text>
    </View>
  );
};

export default ContactUs;
