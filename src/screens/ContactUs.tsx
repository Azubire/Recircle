import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Paragraph, Title, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";

const ContactUs = () => {
  const { colors } = useTheme();

  return (
    <ScrollView style={{ flex: 1 }}>
      <CustomStatusbar style="light" />

      <View style={{ paddingHorizontal: 8 }}>
        <Title
          style={{
            alignSelf: "center",
            marginVertical: 16,
            borderBottomWidth: 2,
            borderBottomColor: colors.secondary,
          }}
        >
          Contact Us
        </Title>

        <Paragraph style={{ marginBottom: 16 }}>
          Contact the numbers below to assist you with any enquiries you may
          have.
        </Paragraph>
        <Paragraph>0556890108</Paragraph>
        <Paragraph>0597195759</Paragraph>
        <Paragraph>0502000937</Paragraph>
        <Paragraph>0597019264</Paragraph>
        <Paragraph>0541277451</Paragraph>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
