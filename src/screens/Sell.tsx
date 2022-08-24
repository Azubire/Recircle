import {
  View,
  ScrollView,
  ActivityIndicator,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import "fast-text-encoding";
import Joi from "joi";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppSelector } from "../hooks/reduxhooks";
import { getAllCategory } from "../store/features/RecyclingCategorySlice";
import { getUser } from "../store/features/AuthSlice";

type formData = {
  title: string;
  description: string;
  adImage: ImageSourcePropType;
  price: number;
  weight: number;
  categoryId: number;
};
// joi validation
const schema = Joi.object<any, true, formData>({
  title: Joi.string().required(),
  categoryId: Joi.number().required(),
  weight: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  adImage: Joi.number().required(),
});

const Sell = ({ route }: TabScreenProps<"Sell">) => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    number | undefined
  >();
  const [loading, setLoading] = React.useState(true);

  const id = route.params?.id;
  const userId = useAppSelector(getUser);
  const { auth } = useAppSelector(getUser);

  const { colors } = useTheme();
  const categories = useAppSelector(getAllCategory);

  React.useEffect(() => {
    setSelectedCategory(id);
    setLoading(false);
  }, [id]);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<formData>({
    defaultValues: {},
    // resolver : joiResolver(schema)
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log("formData", data);
      console.log(
        "validation result",
        await joiResolver(schema)(data, context, options)
      );
      return joiResolver(schema)(data, context, options);
    },
  });

  const onSubmit: SubmitHandler<formData> = (data) => {
    console.log("form-data---->>>>", data);
  };

  return loading ? (
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
            <TextInput
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="Title of your ad"
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
              <TextInput
                mode="outlined"
                render={() => (
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) =>
                      setSelectedCategory(itemValue)
                    }
                    prompt="Select a category"
                  >
                    {categories.map((item) => (
                      <Picker.Item
                        key={item.id}
                        label={item.title}
                        value={item}
                      />
                    ))}
                  </Picker>
                )}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 16, marginRight: 1 }}>
              <Text variant="labelLarge">Weight</Text>

              <TextInput
                style={{ backgroundColor: colors.light }}
                label="Weight"
                mode="outlined"
                placeholder="45.5Kg"
              />
            </View>
          </View>
          {/* price   */}
          <View style={{ marginBottom: 20 }}>
            <Text variant="labelLarge">Price</Text>

            <TextInput
              style={{ backgroundColor: colors.light }}
              mode="outlined"
              placeholder="100.00"
              right={<TextInput.Affix text="GHC" />}
            />
          </View>
          {/* Description  */}
          <View style={{ marginBottom: 20 }}>
            <Text variant="labelLarge">Description</Text>

            <TextInput
              style={{ backgroundColor: colors.light }}
              multiline
              numberOfLines={4}
              mode="outlined"
              placeholder="details about the ad"
            />
          </View>
          {/* upload Image  */}
          <View>
            <Text variant="labelLarge">Upload Image</Text>

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
              <Button mode="contained" buttonColor={colors.primary}>
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
