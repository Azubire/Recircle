import { View, FlatList, SafeAreaView } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";

const img1 = require("../../assets/images/r1.jpg");
const img2 = require("../../assets/images/r2.jpg");
const img3 = require("../../assets/images/r3.jpg");

const data = [
  {
    id: 1,
    name: "Caressona Ldt",
    motto: "we are the best",
    profile:
      "We are focused on recycling waste products to bring out something meaningful to the environment.",
    img: img1,
    workinghours: "6am - 6pm",
    workingDays: "Mon - Fri",
    location: "Accra Tema",
    verified: true,
    ratings: 122,
  },
  {
    id: 2,
    name: "My-Waist Recycle Ldt",
    motto: "Bring your material to us",
    profile:
      "We collect all kind of waste material from you no matter your location. Just make your offer.",
    img: img2,
    workinghours: "8am - 4pm",
    workingDays: "Mon - Fri",
    location: "Kumasi Adom",
    verified: false,
    ratings: 122,
  },
  {
    id: 3,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.",
    img: img3,
    workinghours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
  {
    id: 4,
    name: "North-Bridge Collector",
    motto: "we collect them all",
    profile:
      "We aim to protect and transform the world with our recycling methods. What is better than saung the world and making some money?.",
    img: img3,
    workinghours: "7am - 5pm",
    workingDays: "Mon - Fri",
    location: "Bolgatanga Soe",
    verified: true,
    ratings: 122,
  },
];

const Recyclers = ({ navigation }: RecyclerStackScreenProps<"Recyclers">) => {
  const { colors } = useTheme();
  return (
    <SafeAreaView>
      <FlatList
        style={{ paddingHorizontal: 6 }}
        ListHeaderComponentStyle={{ marginTop: 16 }}
        ListHeaderComponent={() => {
          return <View></View>;
        }}
        // showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ backgroundColor: colors.light, marginBottom: 10 }}>
            <Card.Title
              title={item.name}
              titleVariant="titleMedium"
              titleStyle={{ paddingLeft: 15 }}
              subtitleStyle={{ marginTop: 10, paddingLeft: 15 }}
              subtitle={
                <Text>
                  <View>
                    <Text variant="bodySmall">{item.motto}</Text>
                    <View style={{ flexDirection: "row" }}>
                      {Array.from(
                        [1, 2, 3, 4, 5].map((item) => (
                          <Ionicons
                            name="star"
                            color={colors.secondary}
                            size={15}
                          />
                        ))
                      )}
                    </View>
                  </View>
                </Text>
              }
              left={() => <Avatar.Image source={item.img} size={60} />}
              right={() => (
                <Octicons
                  name="verified"
                  size={24}
                  color={item.verified ? colors.primary : colors.danger}
                />
              )}
              rightStyle={{ top: 10, position: "absolute", right: 10 }}
            />
            <Card.Content>
              <Text
                variant="bodyMedium"
                // style={{ textAlign: "center", marginVertical: 16 }}
              >
                {item.profile}
              </Text>
            </Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ paddingLeft: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time-outline" size={20} />
                  <View style={{ flexDirection: "row", marginLeft: 8 }}>
                    <Text>8am - 4pm</Text>
                    <Text style={{ marginLeft: 8 }}>Mon - Fri</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="location-outline" size={20} />
                  <Text style={{ marginLeft: 8 }}>{item.location}</Text>
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <Button
                  mode="outlined"
                  textColor={colors.secondary}
                  style={{ borderColor: colors.secondary }}
                  onPress={() => {
                    navigation.navigate("RecyclerDetails", {
                      id: item.id.toString(),
                      name: item.name,
                    });
                  }}
                >
                  Contact
                </Button>
              </View>
            </View>
          </Card>
        )}
        // ListFooterComponent={() => <View></View>}
        ListFooterComponentStyle={{ marginBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default Recyclers;
