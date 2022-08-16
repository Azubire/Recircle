import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppSelector } from "../hooks/reduxhooks";
import { adFilterTypes, getBestSellingAds } from "../store/features/AdSlice";
import {
  Button,
  Card,
  Divider,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";

const MyAds = ({ navigation }: HomeStackScreenProps<"MyAds">) => {
  const [myAds, setMyAds] = React.useState<adFilterTypes[]>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const response = useAppSelector(getBestSellingAds);
  const { colors } = useTheme();

  React.useEffect(() => {
    setMyAds(response);
    setLoading(false);
  }, [response]);

  return (
    <SafeAreaView>
      <CustomStatusbar style="light" />

      <FlatList
        data={myAds}
        initialNumToRender={20}
        keyExtractor={(item, index) => item.id.toString()}
        ListHeaderComponent={() => (
          <View>
            <Title
              style={{
                marginVertical: 16,
                paddingHorizontal: 6,
                textAlign: "center",
              }}
            >
              List of adverts you have posted
            </Title>
          </View>
        )}
        renderItem={({ item, index }) =>
          loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={item.img}
                    style={{ height: 120, flex: 1 }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 2 }}>
                    {/* <Title>{item.title}</Title> */}
                    <Card.Title
                      title={item.title}
                      subtitle={`${item.date} | ${item.time}`}
                      // left={LeftContent}
                    />
                    <Card.Content>
                      <Paragraph numberOfLines={2}>{item.desc}</Paragraph>
                    </Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button textColor={colors.info}>Edit</Button>
                      <Button textColor={colors.danger}>delete</Button>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          )
        }
        ListFooterComponent={() => <View style={{ marginVertical: 8 }}></View>}
      />
    </SafeAreaView>
  );
};

export default MyAds;
