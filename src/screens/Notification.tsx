import { View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";
import { Avatar, Badge, Card, List, useTheme } from "react-native-paper";
import {
  getAllNotification,
  getNotifications,
} from "../store/features/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser } from "../store/features/AuthSlice";
import { baseUrl } from "../utils/helpers";

const Notification = ({
  navigation,
}: AppDrawerScreenProps<"Notifications">) => {
  const { colors } = useTheme();
  const state = useAppSelector(getAllNotification);
  const appState = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  // console.log(state);

  React.useEffect(() => {
    dispatch(getNotifications(appState.user.profile.id));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomStatusbar style="light" />

      <FlatList
        data={state.data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("NotificationDetails", { id: item.id });
            }}
          >
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <List.Item
                  title={item.title}
                  description={item.body}
                  left={(props) =>
                    item.avatar ? (
                      <Avatar.Image
                        source={{
                          uri: `${baseUrl}/images/categoryImages/${item.avatar}`,
                        }}
                      />
                    ) : (
                      <Avatar.Image source={appState.defaultImg.coverImg} />
                    )
                  }
                  right={(props) => (
                    <Badge
                      style={{
                        position: "absolute",
                        top: 0,
                        // right: 0,
                        backgroundColor: colors.danger,
                      }}
                      visible={item.status == false ? true : false}
                      size={16}
                    ></Badge>
                  )}
                />
              </Card>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => <View style={{ marginVertical: 8 }}></View>}
      />
    </SafeAreaView>
  );
};

export default Notification;
