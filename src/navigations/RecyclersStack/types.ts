import { CompositeScreenProps } from "@react-navigation/native";
import {
  NativeStackNavigatorProps,
  NativeStackScreenProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { HomeStackParamList, HomeStackScreenProps } from "../AppStack/types";

export type RecyclerStackParamList = {
  Recyclers: undefined;
  RecyclerDetails: { id: number; name: string };
};

export type RecyclerStackScreenProps<T extends keyof RecyclerStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RecyclerStackParamList, T>,
    HomeStackScreenProps<keyof HomeStackParamList>
  >;
