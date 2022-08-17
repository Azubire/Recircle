import { StatusBar } from "expo-status-bar";
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam hic
          ipsam in et nam sequi, eaque aut ad excepturi dolorum reiciendis
          officia deserunt alias dolores quae consequuntur itaque. Reiciendis,
          pariatur? Veritatis deleniti, debitis minima cumque nisi eaque ipsum
          quos, quod, eum provident qui exercitationem aliquid enim esse culpa
          magnam officiis labore fugit consequuntur in. Magni quisquam voluptas
          impedit, sed saepe.
        </Paragraph>
        <Paragraph>
          cupiditate itaque. Laudantium! Corrupti inventore, aliquid consectetur
          laboriosam distinctio molestias eaque possimus ut mollitia labore esse
          ratione velit, recusandae architecto saepe blanditiis quos fuga fugiat
          aliquam praesentium adipisci vitae? Similique eius praesentium facere?
          Dolorem beatae minus nihil numquam sunt maxime. Impedit, commodi
          error? Eligendi iusto repudiandae optio molestiae sapiente, ullam
          ratione soluta in. Temporibus sint unde maiores veniam mollitia magni
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam hic
          ipsam in et nam sequi, eaque aut ad excepturi dolorum reiciendis
          officia deserunt alias dolores quae consequuntur itaque. Reiciendis,
          pariatur? Veritatis deleniti, debitis minima cumque nisi eaque ipsum
          quos, quod, eum provident qui exercitationem aliquid enim esse culpa
          magnam officiis labore fugit consequuntur in. Magni quisquam voluptas
          impedit, sed saepe.
        </Paragraph>
        <Paragraph style={{ marginBottom: 16 }}>
          cupiditate itaque. Laudantium! Corrupti inventore, aliquid consectetur
          laboriosam distinctio molestias eaque possimus ut mollitia labore esse
          ratione velit, recusandae architecto saepe blanditiis quos fuga fugiat
          aliquam praesentium adipisci vitae? Similique eius praesentium facere?
          Dolorem beatae minus nihil numquam sunt maxime. Impedit, commodi
          error? Eligendi iusto repudiandae optio molestiae sapiente, ullam
          ratione soluta in. Temporibus sint unde maiores veniam mollitia magni
        </Paragraph>
      </View>
    </ScrollView>
  );
};

export default ContactUs;
