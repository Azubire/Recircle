import { View } from "react-native";
import React from "react";
import CustomStatusbar from "../components/CustomStatusbar";
import { Avatar, Text, Title, useTheme } from "react-native-paper";
import {
  getAllNotification,
  updateNotificationStatus,
} from "../store/features/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser } from "../store/features/AuthSlice";
import { HomeStackScreenProps } from "../navigations/AppStack/types";

const NotificationDetails = ({
  navigation,
  route,
}: HomeStackScreenProps<"NotificationDetails">) => {
  const [data, setData] = React.useState<{
    id: number;
    title: string;
    body: string;
    avatar: string;
    status: boolean;
  }>({ id: 0, title: "", body: "", avatar: "", status: false });

  const { colors } = useTheme();
  const state = useAppSelector(getAllNotification);
  const appState = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const { id } = route.params;

  React.useEffect(() => {
    dispatch(updateNotificationStatus(id));
    const newData = state.data.filter((item) => item.id === id);
    setData(newData[0]);
  }, [id]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
      <CustomStatusbar style="light" />

      <View>
        <View style={{ alignSelf: "center" }}>
          {data.avatar ? (
            <Avatar.Image
              size={100}
              source={{
                uri: `http://192.168.43.35:3001/images/categoryImages/${data.avatar}`,
              }}
            />
          ) : (
            <Avatar.Image size={100} source={appState.defaultImg.coverImg} />
          )}
        </View>
        <View style={{ marginTop: 24 }}>
          <Title>Title</Title>
          <Text>{data.title}</Text>
        </View>
        <View>
          <Title>Message</Title>
          <Text>{data.body}</Text>
        </View>
      </View>
    </View>
  );
};

export default NotificationDetails;
