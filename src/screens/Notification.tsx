import { View, FlatList, Image, ActivityIndicator } from "react-native";
import React from "react";
import { AppDrawerScreenProps } from "../navigations/AppDrawer/Types";
import CustomStatusbar from "../components/CustomStatusbar";
import { Avatar, Badge, Card, List, Title, useTheme } from "react-native-paper";
import {
  getAllNotification,
  NotificationStateTypes,
} from "../store/features/NotificationSlice";
import { useAppSelector } from "../hooks/reduxhooks";

const Notification = ({
  navigation,
}: AppDrawerScreenProps<"Notifications">) => {
  const [Notifications, setNotifications] =
    React.useState<NotificationStateTypes[]>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const { colors } = useTheme();
  const response = useAppSelector(getAllNotification);

  React.useEffect(() => {
    setNotifications(response);
    setLoading(false);
  }, [response]);

  return (
    <View>
      <CustomStatusbar style="light" />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={Notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, margin: 6 }}>
              <Card mode="contained">
                <List.Item
                  title={item.title}
                  description={item.body}
                  left={(props) => (
                    <Avatar.Image source={item.img} {...props} />
                  )}
                  right={(props) => (
                    <Badge
                      style={{
                        position: "absolute",
                        top: 0,
                        // right: 0,
                        backgroundColor: colors.danger,
                      }}
                      visible={item.status === 0 ? true : false}
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
