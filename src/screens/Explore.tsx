import { View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { fetchAdverts, getAds } from "../store/features/AdSlice";
import { Button, Card, Paragraph, Title, useTheme } from "react-native-paper";
import { TabScreenProps } from "../navigations/appTabs/types";
import { SafeAreaView } from "react-native-safe-area-context";
import dateFormat from "dateformat";

const Explore = ({ navigation }: TabScreenProps<"Explore">) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getAds);

  const getAdsFromDB = async () => {
    try {
      const data = await dispatch(fetchAdverts());
      console.log("data----->", data);
    } catch (error) {
      console.log("error---->", error);
    }
  };

  React.useEffect(() => {
    getAdsFromDB();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <ScrollView>
        {state.status === "loading" || state.status === "idle" ? (
          <ActivityIndicator animating size="large" />
        ) : (
          <>
            {/* newest ads */}
            <View>
              <View style={{ paddingHorizontal: 5, marginTop: 16 }}>
                <Title>Newest Ads</Title>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={state.data.newestAds}
                initialNumToRender={20}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, marginHorizontal: 5, marginTop: 16 }}
                  >
                    <Card>
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="outlined"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {item.status}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              filter: "NEW",
                            });
                          }}
                        >
                          View
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                )}
              />
            </View>
            {/* best selling ads */}
            <View>
              <View style={{ paddingHorizontal: 5, marginTop: 16 }}>
                <Title>Best Selling Ads</Title>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={state.data.bestSellingAds}
                initialNumToRender={21}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: 250,
                      backgroundColor: "red",
                      marginHorizontal: 5,
                      marginTop: 16,
                    }}
                  >
                    <Card style={{ top: 0, bottom: 0 }}>
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="outlined"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {item.status}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              filter: "BEST",
                            });
                          }}
                        >
                          View
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                )}
              />
            </View>
            {/* top ads */}
            <View style={{ marginBottom: 16 }}>
              <View style={{ paddingHorizontal: 5, marginTop: 16 }}>
                <Title>Top Ads</Title>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={state.data.topAds}
                initialNumToRender={20}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, marginHorizontal: 5, marginTop: 16 }}
                  >
                    <Card>
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="outlined"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {item.status}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              filter: "TOP",
                            });
                          }}
                        >
                          View
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                )}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
