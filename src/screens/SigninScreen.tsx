import { View, Image, ScrollView } from "react-native";
import React from "react";
import Center from "../components/Center";
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  AuthScreenProps,
  AuthStackParamList,
} from "../navigations/authStack/types";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

const SigninScreen = () => {
  const navigation =
    useNavigation<NavigationProp<AuthStackParamList, "Signin">>();

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
            Signin
          </Text>
          <Text
            style={{ marginTop: 10, textAlign: "center", color: colors.gray }}
            variant="titleSmall"
          >
            Welome back, enter your credentials to access your account
          </Text>
        </View>
        {/* form  */}
        <View style={{ marginBottom: 20 }}>
          {/* Email  */}
          <View style={{ marginBottom: 16 }}>
            <Text>Email Address</Text>
            <TextInput
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="Enter your email"
            />
          </View>
          {/* Password  */}
          <View style={{ marginBottom: 16 }}>
            <Text>Password</Text>
            <TextInput
              secureTextEntry
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="at least 8 characters"
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
            <Checkbox status="unchecked" color={colors.primary} />
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
              Signin
            </Text>
          </Button>
        </View>
        {/* footer  */}
        <View>
          {/* lines  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                borderTopWidth: 1,
                flex: 1,
                marginTop: 4,
                marginHorizontal: 10,
                borderTopColor: colors.gray,
              }}
            ></View>
            <Text>or sign in with</Text>
            <View
              style={{
                borderTopWidth: 1,
                flex: 1,
                marginTop: 4,
                marginHorizontal: 10,
                borderTopColor: colors.gray,
              }}
            ></View>
          </View>
          {/* social logins  */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Button
              style={{ flex: 1, marginHorizontal: 4 }}
              textColor={colors.darkText}
              mode="outlined"
              icon={() => (
                <Ionicons name="logo-google" size={18} color={colors.error} />
              )}
            >
              Google
            </Button>
            <Button
              style={{ flex: 1, marginHorizontal: 4 }}
              textColor={colors.darkText}
              mode="outlined"
              icon={() => <Ionicons name="logo-apple" size={18} />}
            >
              Apple
            </Button>
          </View>
          {/* sign up  */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text variant="bodyMedium">Don't have and account?</Text>
            <Button
              mode="text"
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              Sign up here
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
