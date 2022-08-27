import {
  View,
  ScrollView,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import { Button, Text, useTheme } from "react-native-paper";
import { string } from "joi";
import { FlatList } from "react-native-gesture-handler";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  getAllRecyclers,
  getRecycler,
  initialStateTypes,
} from "../store/features/RecyclerSclice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import dateFormat from "dateformat";

const RecyclerDetails = ({
  route,
}: RecyclerStackScreenProps<"RecyclerDetails">) => {
  const [recycler, setRecycler] = React.useState<initialStateTypes[] | null>(
    null
  );

  const [loading, setLoading] = React.useState<boolean>(true);

  const { colors } = useTheme();
  const { id } = route.params;

  const response = useAppSelector(getRecycler(id));
  const state = useAppSelector(getAllRecyclers);

  React.useEffect(() => {
    console.log(response[0].RecyclingCategory.name);
    setRecycler(response);
    setLoading(false);
  }, [id]);

  // console.log(recycler);

  return state.status === "loading" ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView>
      <CustomStatusbar style="light" />
      {recycler ? (
        <View>
          <View>
            <Image
              source={{
                uri: `http://192.168.43.35:3001/images/recyclers/${response[0].profileImg}`,
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
                Joined On: {dateFormat(recycler[0].createdAt, "fullDate")}
              </Text>
            </View>

            {/* profile  */}
            <View>
              <Text variant="bodyMedium" style={{ marginTop: 16 }}>
                {recycler[0].profile}
              </Text>
            </View>

            {/* cta button */}
            <Button
              mode="contained"
              // buttonColor={colors.secondary}
              style={{
                marginTop: 24,
                marginBottom: 16,
                width: "70%",
                alignSelf: "center",
              }}
            >
              Sell to us
            </Button>
          </View>
        </View>
      ) : (
        <ActivityIndicator style={{ marginTop: 16 }} />
      )}
    </ScrollView>
  );
};

export default RecyclerDetails;
