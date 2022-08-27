import { View, Image, ScrollView, KeyboardAvoidingView } from "react-native";
import React from "react";
import {
  Button,
  Checkbox,
  HelperText,
  Snackbar,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";

import { AuthScreenProps } from "../navigations/authStack/types";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser, setUser, signIn } from "../store/features/AuthSlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { setUserToSecureStore } from "../utils/helpers";

const coverImg = require("../../assets/images/cover.jpeg");
const profileImg = require("../../assets/images/profile.jpeg");

interface formData {
  email: string;
  password: string;
}

const schema = Joi.object<any, true, formData>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().required(),
});

const SigninScreen = ({ navigation }: AuthScreenProps<"Signin">) => {
  const [loading, setLoading] = React.useState(false);
  const [showSnackBar, setShowSnackBar] = React.useState({
    show: false,
    message: "",
  });
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getUser);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<formData>({
    defaultValues: {},

    resolver: joiResolver(schema),
    // resolver: async (data, context, options) => {
    //   // you can debug your validation schema here
    //   console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await joiResolver(schema)(data, context, options)
    //   );
    //   return joiResolver(schema)(data, context, options);
    // },
  });

  const onSubmit: SubmitHandler<formData> = async (formData) => {
    setLoading(true);
    try {
      const data = await dispatch(signIn(formData)).unwrap();
      if (data.error) {
        setShowSnackBar((prev) => ({ show: true, message: data.message }));
      } else if (!data.error) {
        setUserToSecureStore({
          key: "USERTOKEN",
          payload: {
            userToken: data.data.userToken,
            email: data.data.profile.email,
          },
        });
      }
    } catch (error) {
      setLoading(false);
      setShowSnackBar((prev) => ({
        show: true,
        message: "something went wront try again",
      }));
    } finally {
      console.log("auth", state.auth);
      console.log("user", state.user);
    }
  };

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
                {showSnackBar.show ? (
                  <View>
                    <Title style={{ color: colors.danger }}>
                      {showSnackBar.message}
                    </Title>
                  </View>
                ) : (
                  " Welome back, enter your credentials to access your account"
                )}
              </Text>
            </View>
            {/* form  */}
            <View style={{ marginBottom: 20 }}>
              {/* Email  */}
              <View style={{ marginBottom: 16 }}>
                <Text>Email Address</Text>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange }, ...rest }) => (
                    <>
                      <TextInput
                        onChangeText={(email) => onChange(email)}
                        error={Boolean(errors.email)}
                        style={{ backgroundColor: colors.light }}
                        mode="outlined"
                        placeholder="Enter your email"
                        {...rest}
                      />
                      <HelperText type="error" visible={Boolean(errors.email)}>
                        {errors.email?.message}
                      </HelperText>
                    </>
                  )}
                />
              </View>
              {/* Password  */}
              <View style={{ marginBottom: 16 }}>
                <Text>Password</Text>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <TextInput
                        onChangeText={(password) => onChange(password)}
                        error={Boolean(errors.password)}
                        secureTextEntry
                        style={{ backgroundColor: colors.light }}
                        mode="outlined"
                        placeholder="at least 8 characters"
                        right={<TextInput.Icon name="eye" />}
                        {...rest}
                      />
                      <HelperText
                        type="error"
                        visible={Boolean(errors.password)}
                      >
                        {errors.password?.message}
                      </HelperText>
                    </>
                  )}
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
                loading={Boolean(state.auth.status === "loading")}
                mode="contained"
                buttonColor={colors.primary}
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
                onPress={handleSubmit(onSubmit)}
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
                  marginBottom: 16,
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
