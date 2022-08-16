import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  View,
} from "react-native";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TabScreenProps } from "../navigations/appTabs/types";
import { LinearGradient } from "expo-linear-gradient";
import CustomStatusbar from "../components/CustomStatusbar";

const icon1 = require("../../assets/images/icon1.png");
const icon2 = require("../../assets/images/icon2.png");
const icon3 = require("../../assets/images/icon3.png");
const icon4 = require("../../assets/images/icon4.png");

const data: Array<{
  id: number;
  icon: ImageSourcePropType;
  title: string;
  screen: "Sell" | "RecyclersStack" | "Categories" | "MyAds";
}> = [
  {
    id: 1,
    icon: icon1,
    title: "Sell",
    screen: "Sell",
  },
  {
    id: 2,
    icon: icon2,
    title: "Recyclers",
    screen: "RecyclersStack",
  },
  {
    id: 3,
    icon: icon3,
    title: "Categories",
    screen: "Categories",
  },
  {
    id: 4,
    icon: icon4,
    title: "My Ads",
    screen: "MyAds",
  },
];

const Home = ({ navigation }: TabScreenProps<"Home">) => {
  const { colors } = useTheme();
  return (
    <>
      <CustomStatusbar style="light" backgroundColor={colors.primary} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 2,
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
                <LinearGradient
                  start={[0.5, 1]}
                  end={[1, 0.9]}
                  colors={["#065f46", "#66BFA7"]}
                  // locations={[1, 0, 0.3]}
                  // style={{ backgroundColor: "#047857" }}
                >
                  <Card style={{ backgroundColor: "transparent" }}>
                    <Card.Title
                      titleStyle={{ marginTop: 12, color: colors.lightText }}
                      titleVariant="bodySmall"
                      title="Let's Recycle With Recycle"
                      subtitleStyle={{
                        marginBottom: 24,
                        color: colors.lightText,
                      }}
                      subtitleNumberOfLines={4}
                      subtitleVariant="bodyLarge"
                      subtitle="Create an ad with the material you wish to sell and start earning right away"
                    />
                    <Image
                      source={require("../../assets/images/girl.png")}
                      style={{
                        position: "absolute",
                        right: 0,
                        height: "100%",
                        zIndex: -1,
                      }}
                    />

                    <Card.Content>
                      <View>
                        <Button
                          mode="contained"
                          buttonColor={"#e11d48"}
                          style={{ width: 170 }}
                          onPress={() => {
                            navigation.navigate("Sell");
                          }}
                        >
                          Start Selling Now
                        </Button>
                      </View>
                    </Card.Content>
                  </Card>
                </LinearGradient>
              </View>
            );
          }}
          renderItem={({ item, index }) => (
            <Card
              style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#fff",
                margin: 6,
              }}
            >
              <Card.Cover
                resizeMode="contain"
                source={item.icon}
                style={{
                  paddingTop: 10,
                  // borderWidth: 1,
                  alignSelf: "center",
                  height: 100,
                  width: 100,
                  backgroundColor: "#fff",
                }}
              />
              <Card.Content>
                <Text
                  variant="titleMedium"
                  style={{ textAlign: "center", marginVertical: 16 }}
                >
                  {item.title}
                </Text>
                <Button
                  mode="contained"
                  buttonColor={colors.primary}
                  onPress={() => {
                    navigation.navigate(item.screen);
                  }}
                >
                  <Ionicons name="arrow-forward" color="#fff" size={24} />
                </Button>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </>
  );
};

export default Home;
