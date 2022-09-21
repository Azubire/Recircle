import { View, ScrollView, Image } from "react-native";
import React from "react";
import { AuthScreenProps } from "../navigations/authStack/types";
import {
  Button,
  Checkbox,
  HelperText,
  Modal,
  Portal,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomStatusbar from "../components/CustomStatusbar";
// import { getAuth } from "firebase/auth";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { getAuth, getUser, signUp } from "../store/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";

interface formData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Joi.object<any, false, formData>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password"),
});

// const auth = getAuth();
const SignupScreen = ({ navigation }: AuthScreenProps<"Signup">) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showPass, setShowPass] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector(getAuth);
  const state = useAppSelector(getUser);
  console.log(state.user);

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
    //   // console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await joiResolver(schema)(data, context, options)
    //   );
    //   return joiResolver(schema)(data, context, options);
    // },
  });
  // React.useEffect(() => {
  //   console.log("state", state);
  // }, [auth.status]);

  // if (auth.status === "loading") {
  //   setLoading(true);
  // }
  //else if (auth.status === "failed" || auth.status === "idle") {
  //   setLoading(false);
  // } else if (auth.error && auth.message) {
  //   console.log(auth.message);
  // }
  const onSubmit: SubmitHandler<formData> = async (data) => {
    setLoading(true);
    const { confirmPassword, ...rest } = data;
    const newFormData = rest;

    // setLoading(true);
    // redux async thunk dispatches here
    try {
      const data = await dispatch(signUp(newFormData)).unwrap();
      // console.log("response", data);
      if (!data.error) {
        setShowModal(true);
        reset();
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      console.log("runs anyway");
      setLoading(false);
    }
  };

  return (
    <>
      <CustomStatusbar />
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={() => {}}
          contentContainerStyle={{
            width: "80%",
            // height: 300,
            paddingHorizontal: 20,
            paddingVertical: 35,
            backgroundColor: colors.light,
            alignSelf: "center",
          }}
        >
          <Ionicons
            style={{ alignSelf: "center" }}
            name="checkmark-circle-outline"
            size={80}
            color={colors.success}
          />
          <Title style={{ textAlign: "center" }}>Registration Successful</Title>
          <Text style={{ textAlign: "center" }} variant="bodyMedium">
            Sign up was successful, you need to sign in now to continue with
            your account
          </Text>

          <Button
            style={{ marginTop: 16 }}
            mode="contained"
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            Sign in to continue
          </Button>
        </Modal>
      </Portal>
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
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <TextInput
                        onChangeText={onChange}
                        error={Boolean(errors.firstName)}
                        style={{ backgroundColor: colors.light }}
                        mode="outlined"
                        placeholder="your first name"
                        {...rest}
                      />
                      <HelperText
                        type="error"
                        visible={Boolean(errors.firstName)}
                      >
                        {errors.firstName?.message}
                      </HelperText>
                    </>
                  )}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5, marginRight: 1 }}>
                <Text>Last Name</Text>
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, ...rest } }) => (
                    <>
                      <TextInput
                        onChangeText={onChange}
                        error={Boolean(errors.lastName)}
                        style={{ backgroundColor: colors.light }}
                        mode="outlined"
                        placeholder="your last name"
                        {...rest}
                      />
                      <HelperText
                        type="error"
                        visible={Boolean(errors.lastName)}
                      >
                        {errors.lastName?.message}
                      </HelperText>
                    </>
                  )}
                />
              </View>
            </View>
            {/* </View> */}
            {/* Email  */}
            <View style={{ marginBottom: 16 }}>
              <Text>Email Address</Text>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      onChangeText={(text) => onChange(text.trim())}
                      error={Boolean(errors.email)}
                      style={{ backgroundColor: colors.light }}
                      mode="outlined"
                      placeholder="email"
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
              <Text>Create Password</Text>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, ...rest } }) => (
                  <>
                    <TextInput
                      value={value}
                      onChangeText={(password) => onChange(password)}
                      error={Boolean(errors.password)}
                      secureTextEntry={showPass}
                      style={{ backgroundColor: colors.light }}
                      mode="outlined"
                      placeholder="at least 8 characters"
                      right={
                        <TextInput.Icon
                          name="eye"
                          onPress={() => setShowPass((prev) => !prev)}
                        />
                      }
                      {...rest}
                    />
                    <HelperText type="error" visible={Boolean(errors.password)}>
                      {errors.password?.message}
                    </HelperText>
                  </>
                )}
              />
            </View>
            {/* Repeat Password  */}
            <View style={{ marginBottom: 16 }}>
              <Text>Confirm Password</Text>
              <Controller
                name="confirmPassword"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      onChangeText={(text) => onChange(text)}
                      secureTextEntry
                      style={{ backgroundColor: colors.light }}
                      mode="outlined"
                      error={Boolean(errors.confirmPassword)}
                      placeholder="repeat password "
                      right={<TextInput.Icon name="eye" />}
                      {...rest}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(errors.confirmPassword)}
                    >
                      {errors.confirmPassword?.message}
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
              <Checkbox status="checked" color={colors.primary} />
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
              onPress={handleSubmit(onSubmit)}
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
                // loading={}
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
    </>
  );
};

export default SignupScreen;
