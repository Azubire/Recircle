import React from "react";
import AuthNavigationStack from "./authStack/AuthNavigationStack";
import { useAppDispatch, useAppSelector } from "../hooks/reduxhooks";
import HomeStack from "./AppStack/AppStack";
import { getUser, setUser } from "../store/features/AuthSlice";
import { getItem, setItem } from "../utils/helpers";
import * as secureStore from "expo-secure-store";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import CustomStatusbar from "../components/CustomStatusbar";

const Navigation = () => {
  const [loading, setLoading] = React.useState(true);

  const currentUser = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const getItem = async (key: string) => {
    // setLoading(true);
    const results = await secureStore.getItemAsync(key);
    console.log("results", results);
    if (results) {
      dispatch(setUser(JSON.parse(results)));
      setLoading(false);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    getItem("user");
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomStatusbar />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <>{currentUser.isLoggedIn ? <HomeStack /> : <AuthNavigationStack />}</>
    <HomeStack />
  );
};

export default Navigation;
