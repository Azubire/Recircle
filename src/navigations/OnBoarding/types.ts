import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type OnBoardingStackParamList = {
  Welcome: undefined;
};

export type OnBoardingStackScreenProps<
  T extends keyof OnBoardingStackParamList
> = NativeStackScreenProps<OnBoardingStackParamList, T>;
