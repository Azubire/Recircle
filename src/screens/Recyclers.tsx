import { View, FlatList, SafeAreaView } from "react-native";
import React from "react";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Text,
  useTheme,
} from "react-native-paper";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  getAllRecyclers,
  initialStateTypes,
} from "../store/features/RecyclerSclice";
import { useAppSelector } from "../hooks/reduxhooks";

const Recyclers = ({ navigation }: RecyclerStackScreenProps<"Recyclers">) => {
  const [data, setData] = React.useState<initialStateTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const response = useAppSelector(getAllRecyclers);

  React.useEffect(() => {
    // get data from redux store

    // update state with data retrieved from the store
    setData(response);
    console.log("response", response);

    setLoading(false);
  }, []);

  console.log("data", data);
  console.log("loading", loading);

  const { colors } = useTheme();

  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <SafeAreaView>
      <CustomStatusbar style="light" />
      <FlatList
        style={{ paddingHorizontal: 6 }}
        ListHeaderComponentStyle={{ marginTop: 16 }}
        ListHeaderComponent={() => {
          return <View></View>;
        }}
        // showsVerticalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Card style={{ backgroundColor: colors.light, marginBottom: 10 }}>
            <Card.Title
              title={item.name}
              titleVariant="titleMedium"
              titleStyle={{ paddingLeft: 15 }}
              subtitleStyle={{ marginTop: 10, paddingLeft: 15 }}
              subtitle={
                <Text>
                  <View>
                    <Text variant="bodySmall">{item.motto}</Text>
                    <View style={{ flexDirection: "row" }}>
                      {Array.from(
                        [1, 2, 3, 4, 5].map((item, index) => (
                          <Ionicons
                            key={index}
                            name="star"
                            color={colors.secondary}
                            size={15}
                          />
                        ))
                      )}
                    </View>
                  </View>
                </Text>
              }
              left={() => <Avatar.Image source={item.img} size={60} />}
              right={() => (
                <Octicons
                  name="verified"
                  size={24}
                  color={item.verified ? colors.primary : colors.danger}
                />
              )}
              rightStyle={{ top: 10, position: "absolute", right: 10 }}
            />
            <Card.Content>
              <Text
                variant="bodyMedium"
                // style={{ textAlign: "center", marginVertical: 16 }}
              >
                {item.profile}
              </Text>
            </Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <View style={{ paddingLeft: 16 }}>
                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time-outline" size={20} />
                  <View style={{ flexDirection: "row", marginLeft: 8 }}>
                    <Text>8am - 4pm</Text>
                    <Text style={{ marginLeft: 8 }}>Mon - Fri</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Ionicons name="location-outline" size={20} />
                  <Text style={{ marginLeft: 8 }}>{item.location}</Text>
                </View>
              </View>
              <View style={{ marginRight: 20 }}>
                <Button
                  mode="outlined"
                  textColor={colors.secondary}
                  style={{ borderColor: colors.secondary }}
                  onPress={() => {
                    navigation.navigate("RecyclerDetails", {
                      id: item.id,
                      name: item.name,
                    });
                  }}
                >
                  Contact
                </Button>
              </View>
            </View>
          </Card>
        )}
        // ListFooterComponent={() => <View></View>}
        ListFooterComponentStyle={{ marginBottom: 16 }}
      />
    </SafeAreaView>
  );
};

export default Recyclers;
