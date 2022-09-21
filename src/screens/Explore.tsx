import { View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { fetchAdverts, getAds } from "../store/features/AdSlice";
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { TabScreenProps } from "../navigations/appTabs/types";
import { SafeAreaView } from "react-native-safe-area-context";
import dateFormat from "dateformat";
import { getUser } from "../store/features/AuthSlice";

const Explore = ({ navigation }: TabScreenProps<"Explore">) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const state = useAppSelector(getAds);
  const userState = useAppSelector(getUser);

  const getAdsFromDB = async () => {
    try {
      await dispatch(fetchAdverts()).unwrap();
    } catch (error) {}
  };

  React.useEffect(() => {
    if (state.status === "idle") getAdsFromDB();
  }, []);

  // const getName = (id: number) => {
  //   let name;
  //   if (id === userState.user.profile.id) {
  //     name = userState.user.profile.userName.split(" ")[1];
  //   } else {
  //     name = state.status;
  //   }
  // };
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
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        style={{ marginBottom: 16 }}
                        title={<Text>{item.User.name.split(" ")[1]}</Text>}
                        titleStyle={{ marginLeft: 10, marginTop: -20 }}
                        left={() =>
                          item.User.profileImg ? (
                            <Avatar.Image
                              size={45}
                              source={{
                                uri: `http://192.168.43.35:3001/images/categoryImages/${item.User.profileImg}`,
                              }}
                            />
                          ) : (
                            <Avatar.Text
                              size={45}
                              label={item.User.name.split(" ")[0]}
                            />
                          )
                        }
                      />
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                      />

                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="text"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {/* {item.status} */}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              userId: item.User.id,
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
                    <Card>
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        style={{ marginBottom: 16 }}
                        title={<Text>{item.User.name.split(" ")[0]}</Text>}
                        titleStyle={{ marginLeft: 10, marginTop: -20 }}
                        left={() =>
                          item.User.profileImg ? (
                            <Avatar.Image
                              size={45}
                              source={{
                                uri: `http://192.168.43.35:3001/images/categoryImages/${item.User.profileImg}`,
                              }}
                            />
                          ) : (
                            <Avatar.Text
                              size={45}
                              label={item.User.name
                                .split(" ")[0]
                                .charAt(0)
                                .toUpperCase()}
                            />
                          )
                        }
                      />
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                      />

                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="text"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {/* {item.status} */}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              userId: item.User.id,
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
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        style={{ marginBottom: 16 }}
                        title={<Text>{item.User.name.split(" ")[0]}</Text>}
                        titleStyle={{ marginLeft: 10, marginTop: -20 }}
                        left={() =>
                          item.User.profileImg ? (
                            <Avatar.Image
                              size={45}
                              source={{
                                uri: `http://192.168.43.35:3001/images/categoryImages/${item.User.profileImg}`,
                              }}
                            />
                          ) : (
                            <Avatar.Text
                              size={45}
                              label={item.User.name
                                .split(" ")[0]
                                .charAt(0)
                                .toUpperCase()}
                            />
                          )
                        }
                      />
                      <Card.Cover
                        source={{
                          uri: `http://192.168.43.35:3001/images/ads/${item.adImage}`,
                        }}
                      />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={dateFormat(item.createdAt, "fullDate")}
                      />

                      <Card.Content>
                        <Paragraph numberOfLines={1}>
                          {item.description}
                        </Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button
                          mode="text"
                          textColor={colors.info}
                          onPress={() => {}}
                        >
                          {/* {item.status} */}
                        </Button>
                        <Button
                          buttonColor={colors.info}
                          onPress={() => {
                            navigation.navigate("AdDetails", {
                              id: item.id,
                              userId: item.User.id,
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
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
