import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { AppDrawerScreenProps, DrawerParamList } from "../AppDrawer/Types";
import { HomeStackParamList, HomeStackScreenProps } from "../AppStack/types";

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Sell: undefined;
  Search: undefined;
  Profile: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  CompositeScreenProps<
    AppDrawerScreenProps<keyof DrawerParamList>,
    HomeStackScreenProps<keyof HomeStackParamList>
  >
>;
