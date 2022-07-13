import React from "react";
import Settings from "../../screens/SettingsScreen";

import { BottomNavigation, Text } from "react-native-paper";
import HomeStack from "../HomeStack/HomeStack";

type RoutesState = Array<{
  key: string;
  title: string;
  focusedIcon: string;
  unfocusedIcon?: string;
  color?: string;
  badge?: boolean | number | string;
  getAccessibilityLabel?: string;
  getTestID?: string;
}>;

const BottomTabs = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState<RoutesState>([
    {
      key: "Home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
      badge: 10,
    },
    {
      key: "Settings",
      title: "Settings",
      focusedIcon: "cog",
      unfocusedIcon: "cog",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeStack,
    Settings: Settings,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // barStyle={{ backgroundColor: "#fff" }}
    />
  );
};

export default BottomTabs;
