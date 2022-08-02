import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TabScreenProps } from "../navigations/appTabs/types";
const Home = ({ navigation }: TabScreenProps<"Home">) => {
  const { colors } = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // alignContent: "center",
        // backgroundColor: colors.gray,
        paddingHorizontal: 6,
      }}
    >
      <StatusBar style="light" backgroundColor={colors.primary} />
      {/* banner  */}
      <View
        style={{
          // width: "100%",
          marginBottom: 16,
          marginTop: 16,
        }}
      >
        <Card style={{ backgroundColor: colors.primary }}>
          <Card.Title
            titleStyle={{ marginTop: 12, color: colors.lightText }}
            titleVariant="bodySmall"
            title="Let's Recycle With Recycle"
            subtitleStyle={{ marginBottom: 24, color: colors.lightText }}
            subtitleNumberOfLines={4}
            subtitleVariant="bodyLarge"
            subtitle="Create an ad with the material you wish to sell and start earning right away"
          />
          {/* <Card.Cover source={require("../../assets/images/azubire.jpg")} /> */}
          <Card.Content>
            <View>
              <Button
                mode="contained"
                buttonColor={colors.danger}
                style={{ width: 200 }}
              >
                Start Selling Now
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View style={{ marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "center",
            width: "100%",
          }}
        >
          <Card style={{ width: 178 }}>
            <Card.Cover source={require("../../assets/images/azubire.jpg")} />
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ textAlign: "center", marginVertical: 16 }}
              >
                Sell
              </Text>
              <Button mode="contained" buttonColor={colors.secondary}>
                <Ionicons name="arrow-forward" color="#fff" size={24} />
              </Button>
            </Card.Content>
          </Card>
          <Card style={{ width: 178 }}>
            <Card.Cover source={require("../../assets/images/azubire.jpg")} />
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ textAlign: "center", marginVertical: 16 }}
              >
                Sell
              </Text>
              <Button mode="contained" buttonColor={colors.secondary}>
                <Ionicons name="arrow-forward" color="#fff" size={24} />
              </Button>
            </Card.Content>
          </Card>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 16,
            justifyContent: "space-between",
            // alignItems: "center",
            width: "100%",
          }}
        >
          <Card style={{ width: 178 }}>
            <Card.Cover source={require("../../assets/images/azubire.jpg")} />
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ textAlign: "center", marginVertical: 16 }}
              >
                Sell
              </Text>
              <Button mode="contained" buttonColor={colors.secondary}>
                <Ionicons name="arrow-forward" color="#fff" size={24} />
              </Button>
            </Card.Content>
          </Card>
          <Card style={{ width: 178 }}>
            <Card.Cover source={require("../../assets/images/azubire.jpg")} />
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ textAlign: "center", marginVertical: 16 }}
              >
                Sell
              </Text>
              <Button mode="contained" buttonColor={colors.secondary}>
                <Ionicons name="arrow-forward" color="#fff" size={24} />
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
