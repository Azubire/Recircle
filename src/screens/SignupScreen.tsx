import { View, ScrollView, Image } from "react-native";
import React from "react";
import Center from "../components/Center";
import {
  AuthScreenProps,
  AuthStackParamList,
} from "../navigations/authStack/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const SignupScreen = ({ navigation }: AuthScreenProps<"Signup">) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.light,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* header  */}
        <View
          style={{
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 50, height: 50, marginTop: 10 }}
            resizeMode="cover"
          />
          <Text
            variant="titleLarge"
            style={{ color: colors.primary, marginTop: 10, fontWeight: "bold" }}
          >
            LetsRecycle
          </Text>
          <Text
            style={{ marginTop: 10, fontWeight: "300" }}
            variant="titleMedium"
          >
            Signup
          </Text>
          <Text
            style={{ marginTop: 10, textAlign: "center", color: colors.gray }}
            variant="titleSmall"
          >
            Please provide the information below to get your account set up in
            no time
          </Text>
        </View>
        {/* form  */}
        <View style={{ marginBottom: 20 }}>
          {/* Firstname and last name  */}
          <View style={{ marginBottom: 16, flexDirection: "row" }}>
            <View style={{ flex: 1, marginRight: 5 }}>
              <Text>First Name</Text>
              <TextInput
                style={{ backgroundColor: colors.light }}
                mode="outlined"
                placeholder="your first name"
              />
            </View>
            <View style={{ flex: 1, marginLeft: 5, marginRight: 1 }}>
              <Text>Last Name</Text>
              <TextInput
                style={{ backgroundColor: colors.light }}
                mode="outlined"
                placeholder="your last name"
              />
            </View>
          </View>
          {/* </View> */}
          {/* Email  */}
          <View style={{ marginBottom: 16 }}>
            <Text>Email Address</Text>
            <TextInput
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="email"
            />
          </View>
          {/* Password  */}
          <View style={{ marginBottom: 16 }}>
            <Text>Create Password</Text>
            <TextInput
              secureTextEntry
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="at least 8 characters"
              right={<TextInput.Icon name="eye" />}
            />
          </View>
          {/* Repeat Password  */}
          <View style={{ marginBottom: 16 }}>
            <Text>Confirm Password</Text>
            <TextInput
              secureTextEntry
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="repeat password "
              right={<TextInput.Icon name="eye" />}
            />
          </View>
          {/* keep me signin in  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Checkbox status="checked" color={colors.primary} />
            <Text style={{ marginLeft: 10 }}>Keep me signed in</Text>
          </View>
          {/* Button  */}
          <Button
            mode="contained"
            buttonColor={colors.primary}
            // style={{ marginBottom: 10 }}
            contentStyle={{
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
            icon={() => (
              <Ionicons
                name="chevron-forward"
                style={{ alignSelf: "flex-end" }}
                size={20}
                color={colors.light}
              />
            )}
          >
            <Text variant="bodyLarge" style={{ color: colors.light }}>
              Sign up
            </Text>
          </Button>
        </View>
        {/* footer  */}
        <View style={{ marginBottom: 20 }}>
          {/* sign up  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text variant="bodyMedium">Already have an account account?</Text>
            <Button
              mode="text"
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              Signin here
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
