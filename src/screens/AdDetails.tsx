import { View, ScrollView, ActivityIndicator, Image } from "react-native";
import React from "react";
import { HomeStackScreenProps } from "../navigations/AppStack/types";
import { adFilterTypes, getAd, getAds } from "../store/features/AdSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import {
  Button,
  Modal,
  Paragraph,
  Portal,
  Text,
  TextInput,
  Title,
  useTheme,
} from "react-native-paper";
import dateFormat from "dateformat";
import { Ionicons } from "@expo/vector-icons";
import { getUser } from "../store/features/AuthSlice";
import { notify } from "../store/features/NotificationSlice";

const AdDetails = ({
  navigation,
  route,
}: HomeStackScreenProps<"AdDetails">) => {
  const [ad, setAd] = React.useState<adFilterTypes[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [showModal, setShowModal] = React.useState({
    error: false,
    success: false,
  });

  const { user } = useAppSelector(getUser);
  const { id, filter, userId } = route.params;

  const [formData, setFormData] = React.useState({
    userId: user.profile.id,
    name: user.profile.userName,
    img: user.profile.profileImg,
    adId: id,
    sellerId: userId,
    message: "",
  });

  const response = useAppSelector(getAd(filter, id));
  const dispatch = useAppDispatch();
  const colors = useTheme();

  React.useEffect(() => {
    setAd(response);
    setLoading(false);
  }, [id]);
  // console.log(ad && ad[0].title);

  const handleMessageSeller = async () => {
    if (user.profile.id === userId) {
      setShowModal((prev) => ({ ...prev, error: true }));
      return;
    }

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
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {/* modal  */}
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
                Message succesfully sent to {response[0].User.name}
              </Title>
              <Text style={{ textAlign: "center" }} variant="bodyMedium">
                You will get a notification if {response[0].User.name} if
                replies
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
          <Portal>
            <Modal
              visible={showModal.error}
              onDismiss={() =>
                setShowModal((prev) => ({ ...prev, error: true }))
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
                name="close-circle-outline"
                size={80}
                color={"#f43f5e"}
              />
              <Title style={{ textAlign: "center" }}>
                You can't send a message to your self
              </Title>

              <Button
                buttonColor={"#f43f5e"}
                style={{ marginTop: 16 }}
                mode="contained"
                onPress={() => {
                  setShowModal((prev) => ({ ...prev, error: false }));
                }}
              >
                Close
              </Button>
            </Modal>
          </Portal>
          {/* cover image  */}
          <View>
            <Image
              source={{
                uri: `http://192.168.43.35:3001/images/ads/${ad[0].adImage}`,
              }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View style={{ paddingHorizontal: 16 }}>
              <View
                style={{
                  marginTop: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Title style={{ flex: 3 }}>{ad[0]?.title}</Title>
                {ad[0].RecyclingCategory?.name ? (
                  <Button
                    mode="outlined"
                    style={{ borderRadius: 50, marginRight: 2, flex: 1 }}
                  >
                    {"Ghc." + ad[0].price}
                  </Button>
                ) : null}
              </View>
              <Text variant="bodySmall">
                {dateFormat(ad[0].createdAt, "fullDate")}
              </Text>
              <Paragraph style={{ marginTop: 16 }}>
                {ad[0].description}
              </Paragraph>

              <View>
                <TextInput
                  multiline
                  numberOfLines={3}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, message: text }))
                  }
                  mode="outlined"
                  placeholder="Type your message here"
                />
                <Button
                  mode="outlined"
                  style={{ marginTop: 32 }}
                  onPress={handleMessageSeller}
                >
                  Message Seller
                </Button>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default AdDetails;
