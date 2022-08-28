import { View, ScrollView, ActivityIndicator, Image } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { adFilterTypes, getAd } from "../store/features/AdSlice";
import { useAppSelector } from "../hooks/reduxhooks";
import { Button, Paragraph, Text, Title } from "react-native-paper";
import dateFormat from "dateformat";

const AdDetails = ({
  navigation,
  route,
}: HomeStackScreenProps<"AdDetails">) => {
  const [ad, setAd] = React.useState<adFilterTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const { id, filter } = route.params;
  const response = useAppSelector(getAd(filter, id));

  React.useEffect(() => {
    setAd(response);
    setLoading(false);
  }, [id]);
  // console.log(ad && ad[0].title);
  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {/* cover image  */}
          <View>
            <Image
              source={{
                uri: `http://192.168.43.35:3001/images/ads/${ad[0].adImage}`,
              }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View style={{ paddingHorizontal: 16 }}>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Title>{ad[0]?.title}</Title>
                {ad[0].RecyclingCategory?.name && (
                  <Button
                    mode="outlined"
                    style={{ borderRadius: 50, marginRight: 2 }}
                  >
                    {ad[0].RecyclingCategory?.name}
                  </Button>
                )}
              </View>
              <Text variant="bodySmall">
                {dateFormat(ad[0].createdAt, "fullDate")}
              </Text>
              <Paragraph style={{ marginTop: 16 }}>
                {ad[0].description}
              </Paragraph>

              <Button mode="outlined" style={{ marginTop: 32 }}>
                Contact Seller
              </Button>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default AdDetails;
