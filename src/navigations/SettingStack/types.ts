import { NavigationProp, RouteProp } from "@react-navigation/native";

export type setttngsStackParamList = {
  Setting: undefined;
  Profile: undefined;
};

export type screenParamList<T extends keyof setttngsStackParamList> = {
  navigation: NavigationProp<setttngsStackParamList, T>;
  route: RouteProp<setttngsStackParamList, T>;
};
