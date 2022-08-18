import { View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import {
  Button,
  Checkbox,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import { AuthScreenProps } from "../navigations/authStack/types";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppDispatch } from "../hooks/reduxhooks";
import { setUser } from "../store/features/AuthSlice";

const coverImg = require("../../assets/images/cover.jpeg");
const profileImg = require("../../assets/images/profile.jpeg");

const SigninScreen = ({ navigation }: AuthScreenProps<"Signin">) => {
  const [formData, setFormData] = React.useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const fakeUser = {
    email: "azubirepeter@gmail.com",
    password: "123456",
  };

  // fake api response
  const loginAsync = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    let user;

    if (email == fakeUser.email && password == fakeUser.password) {
      user = {
        userToken: "shg2s1dasd121s1d2a1sdasdad4s45as",
        profile: {
          userName: "azubire999",
          email: email,
          coverImg: coverImg,
          profileImg: profileImg,
        },
      };
    } else {
      throw new Error("error");
    }

    return user;
  };

  const onSubmit = async () => {
    // console.log(formData);
    try {
      setLoading((prev) => true);
      const results = await loginAsync(formData);
      dispatch(setUser({ user: results }));
      // setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      <CustomStatusbar />
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 20,
          backgroundColor: colors.light,
        }}
      >
        <KeyboardAvoidingView>
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
                style={{
                  color: colors.primary,
                  marginTop: 10,
                  fontWeight: "bold",
                }}
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
                style={{
                  marginTop: 10,
                  textAlign: "center",
                  color: colors.gray,
                }}
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
                  value={formData.email}
                  onChangeText={(email) =>
                    setFormData((prev) => ({ ...prev, email }))
                  }
                  style={{ backgroundColor: colors.light }}
                  mode="outlined"
                  placeholder="Enter your email"
                />
              </View>
              {/* Password  */}
              <View style={{ marginBottom: 16 }}>
                <Text>Password</Text>
                <TextInput
                  value={formData.password}
                  onChangeText={(password) =>
                    setFormData((prev) => ({ ...prev, password }))
                  }
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
                loading={loading}
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
                onPress={onSubmit}
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
                    <Ionicons
                      name="logo-google"
                      size={18}
                      color={colors.error}
                    />
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
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default SigninScreen;
