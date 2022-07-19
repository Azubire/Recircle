import { NavigationProp, RouteProp } from "@react-navigation/native";

export type HomeStackParamList = {
  Dashboard: undefined;
  Details: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = {
  navigation: NavigationProp<HomeStackParamList, T>;
  route: RouteProp<HomeStackParamList, T>;
};
