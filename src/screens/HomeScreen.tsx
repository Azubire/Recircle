import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  Title,
  useTheme,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TabScreenProps } from "../navigations/appTabs/types";
import { LinearGradient } from "expo-linear-gradient";
import CustomStatusbar from "../components/CustomStatusbar";
import {
  fetchHomeCategory,
  getHomeCategory,
} from "../store/features/HomeCategorySlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import {
  getAllNotificationCount,
  getNotifications,
} from "../store/features/NotificationSlice";
import { useIsFocused } from "@react-navigation/native";
import { getAuth, getUser } from "../store/features/AuthSlice";

const Home = ({ navigation, route }: TabScreenProps<"Home">) => {
  const [showModal, setShowModal] = React.useState(false);

  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const state = useAppSelector(getHomeCategory);
  const { auth } = useAppSelector(getAuth);
  const { user } = useAppSelector(getUser);

  React.useEffect(() => {
    if (state.status === "success") {
      setTimeout(() => {
        // setShowModal(true);
      }, 5000);
    }
  }, [state.status === "success"]);

  const fetchCategory = async () => {
    if (state.status === "idle") {
      try {
        const data = await dispatch(fetchHomeCategory(user.userToken)).unwrap();
        if (!data.error) {
          // success
        }
      } catch (error) {
        //erro
      }
    }
  };

  const getNotification = async () => {
    try {
      const data = await dispatch(getNotifications(user.profile.id)).unwrap();
      // console.log("data", data);
    } catch (error) {
      // console.log("errowr", error);
    }
  };

  React.useEffect(() => {
    getNotification();
    fetchCategory();
  }, [state.data]);

  const focused = useIsFocused();
  const notificationCount = useAppSelector(getAllNotificationCount);
  // console.log("---------------", notificationCount);
  React.useEffect(() => {
    // dispatch(getNotifications(user.profile.id));
    getNotification();
    navigation.setParams({ notificationCount: notificationCount });
  }, [notificationCount, focused, state.data]);

  return (
    <SafeAreaView>
      <CustomStatusbar style="light" />
      {state.status === "loading" ? (
        <ActivityIndicator size="large" />
      ) : (
        <View
          style={{
            // flex: 1,
            paddingHorizontal: 2,
          }}
        >
          {/* modal  */}
          <Portal>
            <Modal
              visible={showModal}
              onDismiss={() => {
                return;
              }}
              contentContainerStyle={{
                width: "80%",
                // height: 300,
                paddingHorizontal: 20,
                paddingVertical: 35,
                backgroundColor: colors.light,
                alignSelf: "center",
              }}
            >
              <Ionicons
                style={{ alignSelf: "center" }}
                name="checkmark-circle-outline"
                size={80}
                color={colors.success}
              />
              <Title style={{ textAlign: "center" }}>
                Welcome to Lets Recycle
              </Title>
              <Text style={{ textAlign: "center" }} variant="bodyMedium">
                start creating adverts to start earning
              </Text>

              <Button
                buttonColor={colors.secondary}
                style={{ marginTop: 16 }}
                mode="contained"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Ok
              </Button>
            </Modal>
          </Portal>
          {/* flatlist  */}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={state.data}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    paddingHorizontal: 6,
                    marginBottom: 16,
                    marginTop: 24,
                  }}
                >
                  <LinearGradient
                    start={[0.5, 1]}
                    end={[1, 0.9]}
                    colors={["#065f46", "#66BFA7"]}
                    // locations={[1, 0, 0.3]}
                    // style={{ backgroundColor: "#047857" }}
                  >
                    <Card style={{ backgroundColor: "transparent" }}>
                      <Card.Title
                        titleStyle={{
                          marginTop: 12,
                          color: colors.lightText,
                        }}
                        titleVariant="bodySmall"
                        title="Let's Recycle With Recycle"
                        subtitleStyle={{
                          marginBottom: 24,
                          color: colors.lightText,
                        }}
                        subtitleNumberOfLines={4}
                        subtitleVariant="bodyLarge"
                        subtitle="Create an ad with the material you wish to sell and start earning right away"
                      />
                      <Image
                        source={require("../../assets/images/girl.png")}
                        style={{
                          position: "absolute",
                          right: 0,
                          height: "100%",
                          zIndex: -1,
                        }}
                      />

                      <Card.Content>
                        <View>
                          <Button
                            mode="contained"
                            buttonColor={"#e11d48"}
                            style={{ width: 170 }}
                            onPress={() => {
                              navigation.navigate("Sell");
                            }}
                          >
                            Start Selling Now
                          </Button>
                        </View>
                      </Card.Content>
                    </Card>
                  </LinearGradient>
                </View>
              );
            }}
            renderItem={({ item, index }) => (
              <Card
                style={{
                  flex: 1,
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  margin: 6,
                }}
              >
                <Card.Cover
                  resizeMode="contain"
                  source={{
                    uri: `http://192.168.43.35:3001/images/categoryImages/${item.icon}`,
                  }}
                  style={{
                    paddingTop: 10,
                    // borderWidth: 1,
                    alignSelf: "center",
                    height: 100,
                    width: 100,
                    backgroundColor: "#fff",
                  }}
                />
                <Card.Content>
                  <Text
                    variant="titleMedium"
                    style={{ textAlign: "center", marginVertical: 16 }}
                  >
                    {item.title}
                  </Text>
                  <Button
                    mode="contained"
                    buttonColor={colors.primary}
                    onPress={() => {
                      navigation.navigate(item.screen, { id: user.profile.id });
                    }}
                  >
                    <Ionicons name="arrow-forward" color="#fff" size={24} />
                  </Button>
                </Card.Content>
              </Card>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
