import {
  View,
  ScrollView,
  SafeAreaView,
  ImageSourcePropType,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import CustomStatusbar from "../components/CustomStatusbar";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { Button, Text, TextInput, Title, useTheme } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useAppSelector } from "../hooks/reduxhooks";
import { getHomeCategory } from "../store/features/HomeCategorySlice";
import { getAllAds } from "../store/features/AdSlice";
import { getAllCategory } from "../store/features/RecyclingCategorySlice";
import MultiSelect from "react-native-multiple-select";

interface FormDataTypes {
  companyName: string;
  about: string;
  profile: string;
  location: string;
  workingHours: string;
  profileImg: ImageSourcePropType | undefined;
  isVerified: boolean;
  recyclingCategories: Array<{ id: number; name: string }>;
  userId: number | undefined;
}

const BecomeRecycler = ({
  navigation,
}: HomeStackScreenProps<"BecomeRecycler">) => {
  const [formData, setFormData] = React.useState<FormDataTypes>({
    companyName: "",
    about: "",
    profile: "",
    location: "",
    workingHours: "",
    profileImg: undefined,
    isVerified: false,
    recyclingCategories: [],
    userId: undefined,
  });
  const [selectedCategory, setSelectedCategory] = React.useState<{
    id: number;
    name: string;
  }>();

  const { colors } = useTheme();
  const categories = useAppSelector(getAllCategory);
  const newCat = categories.map((cat) => ({ id: cat.id, name: cat.title }));

  // React.useEffect(() => {
  //   setFormData((prev) => ({ ...prev, recyclingCategories: newCat }));
  // }, [categories]);
  console.log(formData.recyclingCategories);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusbar style="light" />
      <KeyboardAvoidingView>
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
          <MultiSelect
            searchIcon={false}
            hideTags
            selectText="Selected categories"
            styleTextDropdown={{
              paddingLeft: 16,
            }}
            styleTextDropdownSelected={{
              paddingLeft: 16,
            }}
            styleRowList={{ paddingVertical: 6 }}
            items={newCat}
            uniqueKey="id"
            selectedItems={formData.recyclingCategories}
            onSelectedItemsChange={(items) =>
              setFormData((prev) => ({ ...prev, recyclingCategories: items }))
            }
          />
        </View>
        <ScrollView>
          <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
            {/* form  */}
            <View style={{ marginTop: 16 }}>
              <TextInput
                value={formData.companyName}
                onChangeText={(companyName) =>
                  setFormData((prev) => ({ ...prev, companyName }))
                }
                label="Company Name"
                placeholder="Enter name of company"
              />
              <TextInput
                style={{ marginTop: 16 }}
                value={formData.about}
                onChangeText={(about) =>
                  setFormData((prev) => ({ ...prev, about }))
                }
                label="About"
                placeholder="Enter a short description of your company"
              />
              <TextInput
                style={{ marginTop: 16 }}
                value={formData.profile}
                multiline
                numberOfLines={4}
                onChangeText={(profile) =>
                  setFormData((prev) => ({ ...prev, profile }))
                }
                label="Profile"
                placeholder="Enter your company's profile"
              />
              <TextInput
                style={{ marginTop: 16 }}
                value={formData.location}
                onChangeText={(location) =>
                  setFormData((prev) => ({ ...prev, location }))
                }
                label="location"
                placeholder="Enter your location"
              />

              <Button style={{ marginVertical: 24 }} mode="contained">
                Submit
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BecomeRecycler;
