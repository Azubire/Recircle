import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerParamList } from "../AppDrawer/Types";

export type HomeStackParamList = {
  Home: NavigatorScreenParams<DrawerParamList> | undefined;
  Explore: undefined;
  CreateAd: undefined;
  Search: undefined;
  Profile: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends HomeStackParamList {}
  }
}
