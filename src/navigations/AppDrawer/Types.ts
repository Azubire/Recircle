import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { HomeStackParamList, HomeStackScreenProps } from "../AppStack/types";
import { TabParamList } from "../appTabs/types";

export type DrawerParamList = {
  Dashboard: NavigatorScreenParams<TabParamList> | undefined;
  History: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type AppDrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    HomeStackScreenProps<keyof HomeStackParamList>
  >;
