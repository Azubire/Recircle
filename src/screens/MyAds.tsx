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
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { Button, Card, Paragraph, Title, useTheme } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import {
  getUserAds,
  getUserAdsState,
  removeUserAds,
} from "../store/features/UserAds";
import { baseUrl } from "../store/features/AuthSlice";

const MyAds = ({ navigation, route }: HomeStackScreenProps<"MyAds">) => {
  // const [myAds, setMyAds] = React.useState<adFilterTypes[]>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const dispatch = useAppDispatch();
  const { status, data } = useAppSelector(getUserAdsState);
  const { colors } = useTheme();
  const { id } = route.params;
  // console.log(id);

  const myAds = async (id: string) => {
    try {
      await dispatch(getUserAds(id)).unwrap();
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    myAds(id.toString());
    return () => {
      dispatch(removeUserAds());
    };
  }, []);

  return (
    <SafeAreaView>
      <CustomStatusbar style="light" />
      {status === "loading" || status === "idle" ? (
        <ActivityIndicator size="large" />
      ) : data.user.length > 0 ? (
        <FlatList
          data={data.user}
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
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: `${baseUrl}/images/ads/${item.adImage}`,
                    }}
                    style={{ height: 120, flex: 1 }}
                    resizeMode="cover"
                  />
                  <View style={{ flex: 2 }}>
                    {/* <Title>{item.title}</Title> */}
                    <Card.Title
                      title={item.title}
                      subtitle={`${item.createdAt} | ${item.createdAt}`}
                      // left={LeftContent}
                    />
                    <Card.Content>
                      <Paragraph numberOfLines={2}>
                        {item.description}
                      </Paragraph>
                    </Card.Content>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button textColor={colors.gray}>Status :</Button>
                      <Button
                        textColor={
                          item.status === "pending"
                            ? colors.info
                            : item.status === "complete"
                            ? colors.success
                            : colors.danger
                        }
                      >
                        {item.status}
                      </Button>
                    </View>
                  </View>
                </View>
              </Card>
            </View>
          )}
          ListFooterComponent={() => (
            <View style={{ marginVertical: 8 }}></View>
          )}
        />
      ) : (
        <Title style={{ marginTop: 16 }}>
          You dont have adverts yet create some to and view them here later
        </Title>
      )}
    </SafeAreaView>
  );
};

export default MyAds;
