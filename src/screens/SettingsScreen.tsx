import { Image, SafeAreaView, View } from "react-native";
import React from "react";
import { Text, Title } from "react-native-paper";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppSelector } from "../hooks/reduxhooks";
import { getUser } from "../store/features/AuthSlice";
import { baseUrl } from "../utils/helpers";

const Settings = ({ navigation }: AppDrawerScreenProps<"Settings">) => {
  const state = useAppSelector(getUser);

  return (
    <SafeAreaView>
      <CustomStatusbar style="light" />
      <View>
        {state.user?.profile.coverImg ? (
          <Image
            source={{
              uri: `${baseUrl}/images/categoryImages/${state.user?.profile.coverImg}`,
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 150,
            }}
          />
        ) : (
          <Image
            source={state.defaultImg.coverImg}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 150,
            }}
          />
        )}
        <View
          style={{
            alignSelf: "center",
            marginTop: 100,
          }}
        >
          <Title style={{ textAlign: "center" }}>App Details</Title>
          <Text variant="bodySmall" style={{ textAlign: "center" }}>
            Name: Lets Recycle
          </Text>
          <Text variant="bodySmall" style={{ textAlign: "center" }}>
            Version: Version 1.0.0{" "}
          </Text>
          <Text variant="bodySmall" style={{ textAlign: "center" }}>
            Release Year: @2022
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
