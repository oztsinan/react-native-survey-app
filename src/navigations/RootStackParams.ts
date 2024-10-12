import { NavigatorScreenParams } from "@react-navigation/native";
import { Routes } from "./Routes";
import { SurveyDTO } from "@/api/Survey";

export type RootStackParams = {
  [Routes.AUTH]: undefined;
  [Routes.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParams>;
  [Routes.SURVEY]: {
    id: SurveyDTO["id"];
  };
};

export type BottomTabParams = {
  [Routes.BOTTOM_TAB_HOME]: undefined;
  [Routes.BOTTOM_TAB_SURVEY]: undefined;
  [Routes.BOTTOM_TAB_PROFILE]: undefined;
};
