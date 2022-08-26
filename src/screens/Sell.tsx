import {
  View,
  ScrollView,
  ActivityIndicator,
  ImageSourcePropType,
  Platform,
  Image,
} from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import "fast-text-encoding";
import Joi from "joi";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getAllCategory } from "../store/features/RecyclingCategorySlice";
import { getUser } from "../store/features/AuthSlice";
import * as ImagePicker from "expo-image-picker";
import { createAd, getAds } from "../store/features/AdSlice";
import mime from "mime";
import { useNavigation } from "@react-navigation/native";

export type formData = {
  title: string;
  description: string;
  price: string;
  weight: string;
  categoryId: number;
  userId: number;
};
// joi validation
const schema = Joi.object<any, true, formData>({
  title: Joi.string().required(),
  categoryId: Joi.number().required(),
  userId: Joi.number().required(),
  weight: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
});

const Sell = ({ route, navigation }: TabScreenProps<"Sell">) => {
  const [selectedCategory, setSelectedCategory] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [isImageSet, setIsImageSet] = React.useState(false);
  const [image, setImage] = React.useState<any>();

  const id = route.params?.id;
  const { userToken } = useAppSelector(getUser).user;
  const { user } = useAppSelector(getUser);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(getAllCategory);
  const adState = useAppSelector(getAds);

  React.useEffect(() => {
    if (id) {
      setSelectedCategory(id);
    }
    setLoading(false);
  }, [id]);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<formData>({
    defaultValues: { userId: user.profile.id },
    resolver: joiResolver(schema),
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result);
      setIsImageSet(true);
    }
  };

  //create form data
  const createFormData = (image: any, body: any) => {
    const newImg = {
      uri: image.uri,
      name: image.uri.split("/").pop(),
      type: mime.getType(image.uri),
    };
    const data = new FormData();
    //@ts-ignore
    data.append("adImage", newImg);

    for (let key in body) {
      data.append(key, body[key]);
    }

    return data;
  };

  const onSubmit: SubmitHandler<formData> = async (data) => {
    if (!image) {
      console.log("select image");
      return;
    }

    const newData = createFormData(image, data);
    console.log(newData);
    try {
      const data = await dispatch(createAd({ newData, userToken })).unwrap();
      console.log(data);
      if (adState.status === "success") {
        navigation.navigate("MyAds", { id: user.profile.id });
        reset();
      }
    } catch (error) {
      console.log(error);
      console.log(adState.status);
    }
  };

  return categories.status === "loading" ? (
    <ActivityIndicator animating size="large" />
  ) : (
    <>
      <CustomStatusbar style="light" />
      <ScrollView
        style={{
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 6,
          backgroundColor: colors.light,
        }}
      >
        <View>
          {/* title  */}
          <View style={{ marginBottom: 20 }}>
            <Text variant="labelLarge">Title</Text>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field: { onChange, ...rest } }) => (
                <>
                  <TextInput
                    error={Boolean(errors.title)}
                    onChangeText={(title) => onChange(title)}
                    style={{ backgroundColor: colors.light }}
                    mode="outlined"
                    placeholder="Title of your ad"
                    {...rest}
                  />
                  <HelperText type="error" visible={Boolean(errors.title)}>
                    {errors.title?.message}
                  </HelperText>
                </>
              )}
            />
          </View>
          {/* //select category  */}
          <View
            style={{
              flexDirection: "row",
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <View
              style={{
                flex: 2,
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text variant="labelLarge">Select Category</Text>
              <Controller
                name="categoryId"
                control={control}
                defaultValue={1}
                render={({ field: { onChange } }) => (
                  <>
                    <TextInput
                      error={Boolean(errors.categoryId)}
                      mode="outlined"
                      render={() => (
                        <Picker
                          selectedValue={selectedCategory}
                          onValueChange={(itemValue) => {
                            console.log(itemValue);
                            setSelectedCategory(itemValue);
                            //@ts-ignore
                            return onChange(itemValue);
                          }}
                          prompt="Select a category"
                        >
                          {categories.data.map((item) => (
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
                      visible={Boolean(errors.categoryId)}
                    >
                      {errors.categoryId?.message}
                    </HelperText>
                  </>
                )}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 16, marginRight: 1 }}>
              <Text variant="labelLarge">Weight</Text>

              <Controller
                name="weight"
                control={control}
                defaultValue=""
                render={({ field: { onChange, ...rest } }) => (
                  <>
                    <TextInput
                      keyboardType="numeric"
                      error={Boolean(errors.weight)}
                      onChangeText={(weight) => onChange(weight)}
                      style={{ backgroundColor: colors.light }}
                      label="Weight"
                      mode="outlined"
                      placeholder="45.5Kg"
                      {...rest}
                    />
                    <HelperText type="error" visible={Boolean(errors.weight)}>
                      {errors.weight?.message}
                    </HelperText>
                  </>
                )}
              />
            </View>
          </View>
          {/* price   */}
          <View style={{ marginBottom: 20 }}>
            <Text variant="labelLarge">Price</Text>

            <Controller
              name="price"
              control={control}
              defaultValue=""
              render={({ field: { onChange, ...rest } }) => (
                <>
                  <TextInput
                    keyboardType="numeric"
                    error={Boolean(errors.price)}
                    onChangeText={(price) => onChange(price)}
                    style={{ backgroundColor: colors.light }}
                    mode="outlined"
                    placeholder="100.00"
                    right={<TextInput.Affix text="GHC" />}
                    {...rest}
                  />
                  <HelperText type="error" visible={Boolean(errors.price)}>
                    {errors.price?.message}
                  </HelperText>
                </>
              )}
            />
          </View>
          {/* Description  */}
          <View style={{ marginBottom: 20 }}>
            <Text variant="labelLarge">Description</Text>

            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field: { onChange, ...rest } }) => (
                <>
                  <TextInput
                    error={Boolean(errors.description)}
                    onChangeText={(desc) => onChange(desc)}
                    style={{ backgroundColor: colors.light }}
                    multiline
                    numberOfLines={4}
                    mode="outlined"
                    placeholder="details about the ad"
                    {...rest}
                  />
                  <HelperText
                    type="error"
                    visible={Boolean(errors.description)}
                  >
                    {errors.description?.message}
                  </HelperText>
                </>
              )}
            />
          </View>
          {/* upload Image  */}
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
          {/* buttons  */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 40,
            }}
          >
            <Button
              mode="outlined"
              textColor={colors.primary}
              icon={() => (
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color={colors.primary}
                />
              )}
            >
              Add Category
            </Button>
            <Button
              loading={Boolean(adState.status === "loading")}
              style={{ marginLeft: 16 }}
              mode="contained"
              buttonColor={colors.primary}
              icon={() => (
                <Ionicons
                  name="checkmark-done"
                  size={20}
                  color={colors.light}
                />
              )}
              onPress={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Sell;
