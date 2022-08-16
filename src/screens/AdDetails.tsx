import { View, ScrollView, ActivityIndicator, Image } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { adFilterTypes, getAd } from "../store/features/AdSlice";
import { useAppSelector } from "../hooks/reduxhooks";
import { Button, Paragraph, Text, Title } from "react-native-paper";

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
              source={ad[0]?.img}
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
                <Button mode="outlined" style={{ borderRadius: 50 }}>
                  {ad[0]?.category}
                </Button>
              </View>
              <Text variant="bodySmall">{`${ad[0]?.date} | ${ad[0]?.time}`}</Text>
              <Paragraph style={{ marginTop: 16 }}>{ad[0]?.desc}</Paragraph>

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
