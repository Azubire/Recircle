import React from "react";
import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Drawer as PaperDrawer,
  Button,
  Text,
  useTheme,
  Avatar,
  Badge,
} from "react-native-paper";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import { getUser, removeUser } from "../store/features/AuthSlice";
import * as secureStore from "expo-secure-store";
import {
  getAllNotification,
  getAllNotificationCount,
} from "../store/features/NotificationSlice";

const logo = require("../../assets/images/logo.png");
const profileImage = require("../../assets/images/profile.jpeg");

const DrawerContent = (props: DrawerContentComponentProps) => {
  const [active, setActive] = React.useState<number | null>(null);
  const [notificationCount, setNotificationCount] = React.useState<
    number | null
  >();

  const { navigation, state, descriptors } = props;
  const dispatch = useAppDispatch();

  const { colors } = useTheme();
  const count = useAppSelector(getAllNotificationCount);
  const user = useAppSelector(getUser);

  React.useEffect(() => {
    setNotificationCount(count);
  }, [count]);

  React.useEffect(() => {
    setActive(state.index);
  }, [state.index]);

  const getIcon = (iconName: string) => {
    let icon;
    switch (iconName) {
      case "Categories":
        icon = <Ionicons name="grid-outline" size={20} />;
        break;
      case "History":
        icon = <MaterialIcons name="history" size={20} />;
        break;
      case "AboutUs":
        icon = <Ionicons name="information-circle-outline" size={20} />;
        break;
      case "ContactUs":
        icon = <AntDesign name="contacts" size={20} />;
        break;
      case "Notifications":
        icon = <Ionicons name="notifications-outline" size={20} />;
        break;
      case "Settings":
        icon = <Ionicons name="settings-outline" size={20} />;
        break;

      default:
        icon = <MaterialCommunityIcons name="home" size={20} />;
        break;
    }
    return icon;
  };

  const getName = (item: string) => {
    let routeName;
    switch (item) {
      case "Dashboard":
        routeName = "Dashboard";
        break;
      case "History":
        routeName = "History";
        break;
      case "AboutUs":
        routeName = "About Us";
        break;
      case "ContactUs":
        routeName = "Contact Us";
        break;
      case "Notifications":
        routeName = "Notifications";
        break;
      case "Settings":
        routeName = "Settings";
        break;

      default:
        routeName = "";
        break;
    }

    return routeName;
  };

  const handleLogOut = () => {
    dispatch(removeUser());
    secureStore.deleteItemAsync("user");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* drawer header  */}
        <View style={{ paddingHorizontal: 12 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image source={logo} style={{ height: 40, width: 40 }} />
            <Text
              variant="headlineSmall"
              style={{
                color: colors.primary,
                marginLeft: 8,
                fontWeight: "bold",
              }}
            >
              LetsRecycle
            </Text>
          </View>
          <Button
            mode="contained"
            style={{ marginVertical: 16 }}
            buttonColor={colors.primary}
            icon={() => (
              <MaterialCommunityIcons name="plus" size={25} color={"#fff"} />
            )}
            onPress={() => {
              navigation.navigate("Dashboard", { screen: "Sell" });
            }}
          >
            Create New Ad
          </Button>
        </View>
        <PaperDrawer.Section>
          {/* drawer content  */}
          {state.routeNames.map((item, index) => {
            return (
              <View key={index}>
                <PaperDrawer.Item
                  label={getName(item)}
                  active={active === index}
                  right={() => {
                    if (item === "Notifications") {
                      return (
                        <Badge
                          style={{
                            borderRadius: 30,
                            width: 30,
                            backgroundColor: colors.primary,
                          }}
                        >
                          {notificationCount?.toString()}
                        </Badge>
                      );
                    }
                  }}
                  icon={() => getIcon(item)}
                  onPress={() => {
                    setActive(index);
                    navigation.navigate(item);
                  }}
                />
              </View>
            );
          })}
        </PaperDrawer.Section>
        {/* drawer buttom */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="labelMedium" style={{ opacity: 0.85, marginTop: 16 }}>
            Profile
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity>
              <Avatar.Image size={40} source={user.img.profileImg} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Dashboard", { screen: "Profile" });
              }}
            >
              <View style={{ marginLeft: 8 }}>
                <Text variant="titleMedium">{user.userName}</Text>
                <Text
                  variant="labelMedium"
                  style={{ opacity: 0.85, marginTop: 2 }}
                >
                  {user.email}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <Button
            mode="contained"
            buttonColor={colors.secondary}
            loading={false}
            icon={() => <Ionicons name="log-out" size={25} color="#fff" />}
            onPress={handleLogOut}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DrawerContent;
