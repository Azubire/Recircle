import { View, ScrollView, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { string } from "joi";
import { FlatList } from "react-native-gesture-handler";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  getAllRecyclers,
  getRecycler,
  initialStateTypes,
} from "../store/features/RecyclerSclice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";

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

  React.useEffect(() => {
    setRecycler(response);
    setLoading(false);
  }, [id]);

  // console.log(recycler);

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <ScrollView>
      <CustomStatusbar style="light" />
      {recycler ? (
        <View>
          <View>
            <Image
              source={recycler[0].img}
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
            <FlatList
              style={{ marginTop: 10 }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={recycler[0].buyingCategory}
              renderItem={({ item, index }) => (
                <Button
                  mode="contained-tonal"
                  style={{
                    marginHorizontal: 6,
                    borderRadius: 3,
                  }}
                >
                  {item}
                </Button>
              )}
            />
          </View>
          <View style={{ paddingHorizontal: 6 }}>
            {/* heading  */}
            <View>
              <Text variant="headlineLarge" style={{ marginTop: 16 }}>
                Our Profile
              </Text>
              <Text style={{ color: colors.primary }}>
                Joined: {recycler[0].joinedDate}
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
