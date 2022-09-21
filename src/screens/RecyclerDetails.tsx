import { View, ScrollView, Image, ActivityIndicator } from "react-native";
import React from "react";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import { Button, Text, useTheme } from "react-native-paper";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  getAllRecyclers,
  getRecycler,
  initialStateTypes,
} from "../store/features/RecyclerSclice";
import { useAppSelector } from "../hooks/reduxhooks";
import dateFormat from "dateformat";
import { baseUrl } from "../utils/helpers";

const RecyclerDetails = ({
  route,
}: RecyclerStackScreenProps<"RecyclerDetails">) => {
  const { colors } = useTheme();
  const { id } = route.params;

  const response = useAppSelector(getRecycler(id));
  const state = useAppSelector(getAllRecyclers);

  return (
    <>
      <CustomStatusbar style="light" />

      {state.status === "loading" ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Image
                source={{
                  uri: `${baseUrl}/images/recyclers/${response[0].profileImg}`,
                }}
                resizeMode="cover"
                style={{ width: "100%", height: 200 }}
              />
              <Text
                style={{
                  marginTop: 10,
                  marginHorizontal: 6,
                  color: colors.danger,
                }}
              >
                What we buy
              </Text>
              <Button
                mode="contained-tonal"
                style={{
                  // alignSelf: "flex-end",
                  width: "50%",
                  marginHorizontal: 6,
                  borderRadius: 20,
                }}
              >
                {response[0].RecyclingCategory.name}
              </Button>
            </View>
            <View style={{ paddingHorizontal: 6 }}>
              {/* heading  */}
              <View>
                <Text variant="headlineLarge" style={{ marginTop: 16 }}>
                  Our Profile
                </Text>
                <Text style={{ color: colors.primary }}>
                  Joined On: {dateFormat(response[0].createdAt, "fullDate")}
                </Text>
              </View>

              {/* profile  */}
              <View>
                <Text variant="bodyMedium" style={{ marginTop: 16 }}>
                  {response[0].profile}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default RecyclerDetails;
