import { getLocales } from "expo-localization";
import { Dimensions, Platform } from "react-native";

export const isAndroid = Platform.OS === "android";
export const isIOS = Platform.OS === "ios";
export const isWeb = Platform.OS === "web";

export const deviceWidth = isWeb
  ? ("100vw" as any)
  : Dimensions.get("window").width;
export const deviceHeight = isWeb
  ? ("100vh" as any)
  : Dimensions.get("window").height;

export const deviceLanguage = getLocales()[0]?.languageCode ?? "en";
