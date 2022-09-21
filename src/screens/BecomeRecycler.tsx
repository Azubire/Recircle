import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState } from "react";
import CustomStatusbar from "../components/CustomStatusbar";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import {
  fetchRecyclingCategories,
  getAllCategory,
} from "../store/features/RecyclingCategorySlice";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import { getAuth } from "../store/features/AuthSlice";
import {
  createRecycler,
  getAllRecyclers,
} from "../store/features/RecyclerSclice";
import { Picker } from "@react-native-picker/picker";

// formData imterface definition
interface formData {
  companyName: string;
  about: string;
  profile: string;
  location: string;
  userId: number;
  workingHours: string;
  recyclingCatId: number;
}

//joi schema validation
const schema = Joi.object<any, true, formData>({
  companyName: Joi.string().required(),
  about: Joi.string().required(),
  profile: Joi.string().required().min(10),
  location: Joi.string().required(),
  workingHours: Joi.string().required(),
  recyclingCatId: Joi.number().required(),
  userId: Joi.number().required(),
});

const BecomeRecycler = ({
  navigation,
}: HomeStackScreenProps<"BecomeRecycler">) => {
  const { colors } = useTheme();
  const categories = useAppSelector(getAllCategory);

  const newCat = categories.data.map((cat) => ({ id: cat.id, name: cat.name }));

  // category state
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);

  const { user } = useAppSelector(getAuth);
  const state = useAppSelector(getAllRecyclers);
  const dispatch = useAppDispatch();

  //selected image
  const [image, setImage] = useState<any>();
  const [isImageSet, setIsImageSet] = useState(false);

  React.useEffect(() => {
    if (categories.status === "failed" || categories.status === "idle") {
      dispatch(fetchRecyclingCategories);
    }
    // console.log("----", categories);
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result);
    if (!result.cancelled) {
      setImage(result);
      setIsImageSet(true);
    }
  };

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<formData>({
    defaultValues: {
      userId: user.profile.id,
    },

    resolver: joiResolver(schema),
    // resolver: async (data, context, options) => {
    // you can debug your validation schema here
    // console.log("formData", data);
    //   console.log(
    //     "validation result",
    //     await joiResolver(schema)(data, context, options)
    //   );
    //   return joiResolver(schema)(data, context, options);
    // },
  });

  //create form data
  const createFormData = (image: any, body: any) => {
    const newImg = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: mime.getType(image.uri),
    };
    const data = new FormData();
    //@ts-ignore
    data.append("recyclerImage", newImg);

    for (let key in body) {
      data.append(key, body[key]);
    }

    return data;
  };

  //function to submit form after validation
  const onSubmit: SubmitHandler<formData> = async (data) => {
    if (!image) {
      // console.log("select image");
      return;
    }

    const newData = createFormData(image, data);
    // console.log(newData);
    const { userToken } = user;
    try {
      const data = await dispatch(
        createRecycler({ newData, userToken })
      ).unwrap();
      navigation.goBack();
      reset();
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusbar style="light" />
      <ScrollView>
        <KeyboardAvoidingView enabled>
          <View style={{ paddingHorizontal: 16 }}>
            <Text
              variant="titleMedium"
              style={{
                marginVertical: 16,
                textAlign: "center",
                borderBottomWidth: 2,
                borderBottomColor: colors.info,
              }}
            >
              Please complete the form below to become a recycler
            </Text>
            <Controller
              name="recyclingCatId"
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <HelperText type="info">Select a category</HelperText>
                  <TextInput
                    error={Boolean(errors.recyclingCatId)}
                    mode="outlined"
                    render={() => (
                      <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => {
                          // console.log(itemValue);
                          setSelectedCategory(itemValue);
                          //@ts-ignore
                          return onChange(itemValue);
                        }}
                        prompt="Select a category"
                      >
                        {newCat.map((item) => (
                          <Picker.Item
                            key={item.id}
                            label={item.name}
                            value={item.id}
                          />
                        ))}
                      </Picker>
                    )}
                  />
                  <HelperText
                    type="error"
                    visible={Boolean(errors.recyclingCatId)}
                  >
                    {errors.recyclingCatId?.message}
                  </HelperText>
                </>
              )}
            />
          </View>
          <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            {/* form  */}
            <View style={{ marginTop: 16 }}>
              <Controller
                name="companyName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      onChangeText={(text) => onChange(text)}
                      error={Boolean(errors.companyName)}
                      label="Company Name"
                      placeholder="Enter name of company"
                      {...rest}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(errors.companyName)}
                    >
                      {errors.companyName?.message}
                    </HelperText>
                  </>
                )}
              />
              <Controller
                name="about"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      style={{ marginTop: 16 }}
                      onChangeText={(about) => onChange(about)}
                      error={Boolean(errors.about)}
                      label="About"
                      placeholder="Enter a short description of your company"
                      {...rest}
                    />
                    <HelperText type="error" visible={Boolean(errors.about)}>
                      {errors.about?.message}
                    </HelperText>
                  </>
                )}
              />
              <Controller
                name="profile"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      error={Boolean(errors.profile)}
                      style={{ marginTop: 16 }}
                      multiline
                      numberOfLines={4}
                      onChangeText={(profile) => onChange(profile)}
                      label="Profile"
                      placeholder="Enter your company's profile"
                      {...rest}
                    />
                    <HelperText type="error" visible={Boolean(errors.profile)}>
                      {errors.profile?.message}
                    </HelperText>
                  </>
                )}
              />
              <Controller
                name="location"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      error={Boolean(errors.location)}
                      style={{ marginTop: 16 }}
                      onChangeText={(location) => onChange(location)}
                      label="location"
                      placeholder="Enter your location"
                      {...rest}
                    />
                    <HelperText type="error" visible={Boolean(errors.location)}>
                      {errors.location?.message}
                    </HelperText>
                  </>
                )}
              />
              <Controller
                name="workingHours"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      error={Boolean(errors.location)}
                      style={{ marginTop: 16 }}
                      onChangeText={(location) => onChange(location)}
                      label="Working Hours"
                      placeholder="Enter your woking hours"
                      {...rest}
                    />
                    <HelperText
                      type="error"
                      visible={Boolean(errors.workingHours)}
                    >
                      {errors.workingHours?.message}
                    </HelperText>
                  </>
                )}
              />

              <View>
                <Text variant="labelLarge">Upload Image</Text>
                {isImageSet ? (
                  <Image
                    // @ts-ignore
                    source={{ uri: image.uri }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                  />
                ) : (
                  <HelperText type="error" visible={!isImageSet}>
                    Please select an image
                  </HelperText>
                )}

                <View
                  style={{
                    alignItems: "center",
                    borderStyle: "dashed",
                    borderWidth: 1,
                    marginBottom: 20,
                    marginTop: 8,
                    paddingVertical: 20,
                  }}
                >
                  <Ionicons name="cloud-upload-outline" size={20} />
                  <Text style={{ marginVertical: 10, fontWeight: "100" }}>
                    Browse and choose images
                  </Text>
                  <Button
                    mode="contained"
                    buttonColor={colors.primary}
                    onPress={pickImage}
                  >
                    <Ionicons name="add" size={20} color={colors.light} />
                  </Button>
                </View>
              </View>

              <Button
                loading={Boolean(state.status === "loading")}
                style={{ marginVertical: 24 }}
                mode="contained"
                onPress={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BecomeRecycler;
