import { View, ScrollView } from "react-native";
import React from "react";
import { TabScreenProps } from "../navigations/appTabs/types";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import "fast-text-encoding";
import Joi from "joi";

type formData = {
  title: string;
  category: string;
  weight: string;
  price: string;
  description: string;
  image: string | string[];
};
// joi validation
const schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.number().required(),
  weight: Joi.number().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

const Sell = ({ route }: TabScreenProps<"Sell">) => {
  const [categoryId, setCategoryId] = React.useState<number | undefined>(1);

  //react-hook-form
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
  } = useForm<formData>({
    defaultValues: {
      title: "",
      category: "",
      weight: "",
      price: "",
      description: "",
      image: "",
    },
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

  const { colors } = useTheme();

  const id = route.params?.id;
  React.useEffect(() => {
    setCategoryId((prev) => id);
  }, [id]);

  return (
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
            // width: "100%",
            // justifyContent: "space-between",
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
              style={{
                backgroundColor: colors.light,
                // justifyContent: "center",
                // alignItems: "center",
                // alignContent: "center",
              }}
              mode="outlined"
              render={(props) => (
                <RNPickerSelect
                  useNativeAndroidPickerStyle={false}
                  value={categoryId}
                  Icon={() => (
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={colors.gray}
                    />
                  )}
                  placeholder={{
                    label: "Select a category",
                    value: null,
                  }}
                  style={{
                    inputAndroid: {
                      color: colors.gray,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      fontSize: 16,
                    },
                    inputIOS: {
                      color: colors.gray,
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      fontSize: 16,
                    },
                    iconContainer: {
                      right: 10,
                      top: 10,
                    },
                    inputAndroidContainer: { paddingRight: 10 },
                  }}
                  onValueChange={(value) => console.log(value)}
                  items={[
                    { label: "Plactic", value: 1 },
                    { label: "Paper", value: 2 },
                    { label: "Glass", value: 3 },
                    { label: "Iron & Wood", value: 4 },
                  ]}
                />
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
              <Ionicons name="checkmark-done" size={20} color={colors.light} />
            )}
            onPress={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default Sell;
