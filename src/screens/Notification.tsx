import { View, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";
import { Avatar, Badge, Card, List, Title, useTheme } from "react-native-paper";
import {
  getAllNotification,
  getNotifications,
  NotificationStateTypes,
} from "../store/features/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser } from "../store/features/AuthSlice";

const Notification = ({
  navigation,
}: AppDrawerScreenProps<"Notifications">) => {
  const { colors } = useTheme();
  const state = useAppSelector(getAllNotification);
  const appState = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getNotifications);
  }, []);

  return (
    <View>
      <CustomStatusbar style="light" />

      {state.status === "idle" || state.status === "loading" ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <List.Item
                  title={item.title}
                  description={item.body}
                  left={(props) =>
                    item.avatar ? (
                      <Avatar.Image
                        source={{
                          uri: `http://192.168.43.35:3001/images/categoryImages/${item.avatar}`,
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
          )}
          ListFooterComponent={() => (
            <View style={{ marginVertical: 8 }}></View>
          )}
        />
      )}
    </View>
  );
};

export default Notification;
