import { NavigationProp, RouteProp } from "@react-navigation/native";

export type AuthStackParamList = {
  Signin: { id: number };
  Signup: { id: number };
};

export type AuthScreenProps<T extends keyof AuthStackParamList> = {
  navigation: NavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};
