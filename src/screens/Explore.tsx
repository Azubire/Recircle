import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import CustomStatusbar from "../components/CustomStatusbar";
import { useAppSelector } from "../hooks/reduxhooks";
import {
  getBestSellingAds,
  getNewestAds,
  getTopAds,
  initialAdSliceStatetypes,
} from "../store/features/AdSlice";
import { Button, Card, Paragraph, Title, useTheme } from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { TabScreenProps } from "../navigations/appTabs/types";

const Explore = ({ navigation }: TabScreenProps<"Explore">) => {
  const [data, setData] = React.useState<initialAdSliceStatetypes>();
  const [loading, setLoading] = React.useState(true);

  const newestAds = useAppSelector(getNewestAds);
  const bestSellingAd = useAppSelector(getBestSellingAds);
  const topAds = useAppSelector(getTopAds);

  const { colors } = useTheme();

  React.useEffect(() => {
    setData({
      newestAds: newestAds,
      bestSellingAds: bestSellingAd,
      topAds: topAds,
    });
    setLoading(false);
  }, [newestAds, bestSellingAd, topAds]);
  console.log("-->>>", data);
  return (
    <>
      <CustomStatusbar style="light" />
      <ScrollView>
        {loading ? (
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
                data={data?.newestAds}
                initialNumToRender={20}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, marginHorizontal: 5, marginTop: 16 }}
                  >
                    <Card>
                      <Card.Cover source={item.img} />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={`${item.date} | ${item.time}`}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={2}>{item.desc}</Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button textColor={colors.info}>Request</Button>
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
                data={data?.bestSellingAds}
                initialNumToRender={20}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, marginHorizontal: 5, marginTop: 16 }}
                  >
                    <Card>
                      <Card.Cover source={item.img} />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={`${item.date} | ${item.time}`}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={2}>{item.desc}</Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button textColor={colors.info}>Request</Button>
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
                data={data?.topAds}
                initialNumToRender={20}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={({ item, index }) => (
                  <View
                    style={{ width: 250, marginHorizontal: 5, marginTop: 16 }}
                  >
                    <Card>
                      <Card.Cover source={item.img} />
                      {/* <Title>{item.title}</Title> */}
                      <Card.Title
                        title={item.title}
                        subtitle={`${item.date} | ${item.time}`}
                        // left={LeftContent}
                      />
                      <Card.Content>
                        <Paragraph numberOfLines={2}>{item.desc}</Paragraph>
                      </Card.Content>
                      <Card.Actions>
                        <Button textColor={colors.info}>Request</Button>
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
    </>
  );
};

export default Explore;
