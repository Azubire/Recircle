import { Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import CustomStatusbar from "../components/CustomStatusbar";
import { AuthScreenProps } from "../navigations/authStack/types";

const WelcomeScreen = ({ navigation }: AuthScreenProps<"Welcome">) => {
  const { colors } = useTheme();

  return (
    <>
      <CustomStatusbar />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.light,
          justifyContent: "space-between",
        }}
      >
        {/* header image */}
        <View>
          <Image
            source={require("../../assets/images/welcome.jpg")}
            style={{ width: "100%", height: 300 }}
            resizeMode="cover"
          />
        </View>
        {/* Message  */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            variant="displayMedium"
            style={{
              color: colors.primary,
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Welcome
          </Text>
          <Text
            variant="bodyLarge"
            style={{
              textTransform: "capitalize",
              textAlign: "center",
            }}
          >
            let's recycle is an app that puts recyclers in touch with collection
            services, streaming the gathering of trash from communities,
            streets, businesses and municipal outlets.
          </Text>
        </View>
        {/* footer  */}
        <View style={{ alignSelf: "center", marginVertical: 30 }}>
          <Button
            style={{ paddingHorizontal: 40 }}
            mode="contained"
            contentStyle={{ flexDirection: "row-reverse" }}
            icon={() => (
              <Ionicons name="arrow-forward" size={20} color={colors.light} />
            )}
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            LET'S GO
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
};

export default WelcomeScreen;
