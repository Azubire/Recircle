import { View, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text, useTheme } from "react-native-paper";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { RecyclerStackScreenProps } from "../navigations/RecyclersStack/types";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  fetchRecylers,
  getAllRecyclers,
} from "../store/features/RecyclerSclice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getAuth } from "../store/features/AuthSlice";
import { baseUrl } from "../utils/helpers";

const Recyclers = ({ navigation }: RecyclerStackScreenProps<"Recyclers">) => {
  const state = useAppSelector(getAllRecyclers);
  const { user } = useAppSelector(getAuth);
  const dispatch = useAppDispatch();

  const { colors } = useTheme();

  const getData = async () => {
    try {
      await dispatch(fetchRecylers(user.userToken)).unwrap();
      // console.log("success", data);
    } catch (error) {
      // console.log("error", error);
    }
  };

  React.useEffect(() => {
    if (state.status === "idle") {
      getData();
    }
  }, [state.data]);

  return (
    <>
      <CustomStatusbar style="light" />
      {state.status == "loading" || state.status === "idle" ? (
        <ActivityIndicator animating size="large" />
      ) : (
        <SafeAreaView>
          <FlatList
            style={{ paddingHorizontal: 6 }}
            ListHeaderComponentStyle={{ marginTop: 16 }}
            ListHeaderComponent={() => {
              return <View></View>;
            }}
            // showsVerticalScrollIndicator={false}
            data={state.data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Card style={{ backgroundColor: colors.light, marginBottom: 10 }}>
                <Card.Title
                  title={item.companyName}
                  titleVariant="titleMedium"
                  titleStyle={{ paddingLeft: 15 }}
                  subtitleStyle={{ marginTop: 10, paddingLeft: 15 }}
                  subtitle={
                    <Text>
                      <View>
                        <Text variant="bodySmall">{item.about}</Text>
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
                  left={() => (
                    <Avatar.Image
                      source={{
                        uri: `${baseUrl}/images/recyclers/${item.profileImg}`,
                      }}
                      size={60}
                    />
                  )}
                  right={() => (
                    <Octicons
                      name="verified"
                      size={24}
                      color={item.isVerified ? colors.primary : colors.danger}
                    />
                  )}
                  rightStyle={{ top: 10, position: "absolute", right: 10 }}
                />
                <Card.Content>
                  <Text
                    numberOfLines={5}
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
                        <Text>{item.workingDays}</Text>
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
                          name: item.companyName,
                        });
                      }}
                    >
                      View Profile
                    </Button>
                  </View>
                </View>
              </Card>
            )}
            // ListFooterComponent={() => <View></View>}
            ListFooterComponentStyle={{ marginBottom: 16 }}
          />
        </SafeAreaView>
      )}
    </>
  );
};

export default Recyclers;
