import { ScrollView, View } from "react-native";
import React from "react";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  Avatar,
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import {
  getAllNotification,
  notify,
  updateNotificationStatus,
} from "../store/features/NotificationSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser } from "../store/features/AuthSlice";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { Ionicons } from "@expo/vector-icons";

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
    userId: number;
  }>({ id: 0, title: "", body: "", avatar: "", status: false, userId: -1 });

  const [showModal, setShowModal] = React.useState({
    error: false,
    success: false,
  });

  const state = useAppSelector(getAllNotification);
  const appState = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const { id } = route.params;

  React.useEffect(() => {
    dispatch(updateNotificationStatus(id));
    const newData = state.data.filter((item) => item.id === id);
    setData(newData[0]);
  }, [id]);
  // console.log(data);
  const [formData, setFormData] = React.useState({
    userId: appState.user.profile.id,
    name: appState.user.profile.userName,
    img: appState.user.profile.profileImg,
    adId: id,
    sellerId: data.userId,
    message: "",
  });

  const handleMessageSeller = async () => {
    if (appState.user.profile.id === data.userId) {
      setShowModal((prev) => ({ ...prev, error: true }));
      return;
    }
    console.log("first");

    if (formData.message.length < 1) {
      return;
    }
    try {
      const data = await dispatch(
        ///@ts-ignore
        notify({ id: formData.userId, body: formData })
      ).unwrap();
      if (!data.error) {
        setShowModal((prev) => ({ ...prev, success: true }));
        setFormData((prev) => ({
          ...prev,
          message: "",
        }));
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
      <CustomStatusbar style="light" />
      <Portal>
        <Modal
          visible={showModal.success}
          onDismiss={() =>
            setShowModal((prev) => ({ ...prev, success: false }))
          }
          contentContainerStyle={{
            width: "80%",
            // height: 300,
            paddingHorizontal: 20,
            paddingVertical: 35,
            backgroundColor: "#fff",
            alignSelf: "center",
          }}
        >
          <Ionicons
            style={{ alignSelf: "center" }}
            name="checkmark-circle-outline"
            size={80}
            color={"#22c55e"}
          />
          <Title style={{ textAlign: "center" }}>
            Reply sent to {data.title.split(" ")[3]}
          </Title>
          <Text style={{ textAlign: "center" }} variant="bodyMedium">
            You will get a notification if {data.title.split(" ")[3]} if replies
          </Text>

          <Button
            buttonColor={"#f43f5e"}
            style={{ marginTop: 16 }}
            mode="contained"
            onPress={() => {
              setShowModal((prev) => ({ ...prev, success: false }));
            }}
          >
            Ok
          </Button>
        </Modal>
      </Portal>
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
      <View style={{ marginTop: 40 }}>
        <TextInput
          multiline
          numberOfLines={3}
          value={formData.message}
          onChangeText={(text) =>
            setFormData((prev) => ({
              ...prev,
              message: text,
              sellerId: data.userId,
            }))
          }
          mode="outlined"
          placeholder="Reply here..."
        />
        <Button
          mode="outlined"
          style={{ marginTop: 32 }}
          onPress={handleMessageSeller}
        >
          Reply
        </Button>
      </View>
    </ScrollView>
  );
};

export default NotificationDetails;
