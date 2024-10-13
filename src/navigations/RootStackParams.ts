import { NavigatorScreenParams } from "@react-navigation/native";
import { Routes } from "./Routes";
import { SurveyDTO } from "@/api/Survey";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";

export type RootStackParams = {
  [Routes.AUTH]: undefined;
  [Routes.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParams>;
  [Routes.SURVEY]: {
    id: SurveyDTO["id"];
  };
  [Routes.SURVEY_RESULT]: {
    id: SurveyDTO["id"];
  };
};

export type BottomTabParams = {
  [Routes.BOTTOM_TAB_HOME]: undefined;
  [Routes.BOTTOM_TAB_SURVEYS]: undefined;
  [Routes.BOTTOM_TAB_PROFILE]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParams> = NativeStackScreenProps<RootStackParams, T>;
