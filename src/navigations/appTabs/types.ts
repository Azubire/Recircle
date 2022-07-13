import { NavigationProp, RouteProp } from "@react-navigation/native";

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = {
  navigation: NavigationProp<TabParamList, T>;
  route: RouteProp<TabParamList, T>;
};
