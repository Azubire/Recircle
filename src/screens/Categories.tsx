import {
  View,
  FlatList,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { HomeStackScreenProps } from "../navigations/AppStack/types";

const icon1 = require("../../assets/images/icon5.jpg");
const icon2 = require("../../assets/images/icon6.jpg");
const icon3 = require("../../assets/images/icon7.jpg");
const icon4 = require("../../assets/images/icon8.jpg");

const data: Array<{
  id: number;
  icon: ImageSourcePropType;
  title: string;
}> = [
  {
    id: 1,
    icon: icon1,
    title: "Plastic",
  },
  {
    id: 2,
    icon: icon2,
    title: "Paper",
  },
  {
    id: 3,
    icon: icon3,
    title: "Glass",
  },
  {
    id: 4,
    icon: icon4,
    title: "Iron & Wood",
  },
];

const Categories = ({ navigation }: HomeStackScreenProps<"Categories">) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 2,
      }}
    >
      <StatusBar style="light" />
      <View
        style={{
          width: "100%",
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  paddingHorizontal: 6,
                  marginBottom: 16,
                  marginTop: 24,
                }}
              >
                <Card style={{ backgroundColor: colors.light }}>
                  <Card.Title
                    titleStyle={{ marginTop: 12 }}
                    titleVariant="bodySmall"
                    title="Let's Recycle With Recycle"
                    subtitleStyle={{
                      marginBottom: 24,
                    }}
                    subtitleNumberOfLines={4}
                    subtitleVariant="bodyLarge"
                    subtitle="Select from the categories below to start uploading your material"
                  />
                  <Image
                    source={require("../../assets/images/boy.png")}
                    resizeMode="contain"
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      bottom: 0,
                      height: "100%",
                      zIndex: -1,
                    }}
                  />

                  <Card.Content>
                    <Text variant="bodyLarge" style={{ color: colors.info }}>
                      It's easy to get started
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            );
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home", {
                  screen: "Dashboard",
                  params: { screen: "Sell", params: { id: item.id } },
                });
              }}
              style={{
                flex: 1,
                justifyContent: "center",
                margin: 6,
              }}
            >
              <Card style={{ backgroundColor: colors.light }}>
                <Card.Cover
                  resizeMode="contain"
                  source={item.icon}
                  style={{
                    paddingTop: 10,
                    // borderWidth: 1,
                    alignSelf: "center",
                    height: 100,
                    width: 100,
                    backgroundColor: colors.light,
                  }}
                />
                <Card.Content>
                  <Text
                    variant="titleMedium"
                    style={{ textAlign: "center", marginVertical: 16 }}
                  >
                    {item.title}
                  </Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Categories;
