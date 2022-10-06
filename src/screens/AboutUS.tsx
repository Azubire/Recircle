import React from "react";
import { ScrollView, View } from "react-native";
import { Paragraph, Title, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";

const AboutUS = () => {
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
            borderBottomColor: colors.info,
          }}
        >
          Aboust Us
        </Title>

        <Paragraph style={{ marginBottom: 16 }}>
          Simple tool for recycling and disposing waste.
        </Paragraph>
        <Paragraph>
          Lets recycle app enables you to sell or buy waste conviniently and
          profitability, communicate more effieciently with sellers, buyers and
          recyclers.
        </Paragraph>
        <Paragraph>
          Lets recycle app makes you choose the kind of waste you want to sell
          or buy to customers and recyclers which is found in the category
          section on the app dashboard.
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
          Let's recycle,let's make money.
        </Paragraph>
      </View>
    </ScrollView>
  );
};

export default AboutUS;
