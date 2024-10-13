import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { getLocales } from "expo-localization";
import { initReactI18next } from "react-i18next";
import "intl-pluralrules";

import commonEN from "./en/common.json";
import commonTR from "./tr/common.json";
import ProfileModuleEN from "./en/ProfileModule.json";
import ProfileModuleTR from "./tr/ProfileModule.json";
import HomeModuleEN from "./en/HomeModule.json";
import HomeModuleTR from "./tr/HomeModule.json";
import SurveyModuleEN from "./en/SurveyModule.json";
import SurveyModuleTR from "./tr/SurveyModule.json";
import AuthModuleEN from "./en/AuthModule.json";
import AuthModuleTR from "./tr/AuthModule.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";

export const defaultNS = "common";
export const resources = {
  en: {
    common: commonEN,
    ProfileModule: ProfileModuleEN,
    HomeModule: HomeModuleEN,
    SurveyModule: SurveyModuleEN,
    AuthModule: AuthModuleEN,
  },
  tr: {
    common: commonTR,
    ProfileModule: ProfileModuleTR,
    HomeModule: HomeModuleTR,
    SurveyModule: SurveyModuleTR,
    AuthModule: AuthModuleTR,
  },
} as const;

const languageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: async (callback: (lng: string | readonly string[] | undefined) => void) => {
    const strogaLanguage = await AsyncStorage.getItem(StorageKeys.LANGUAGE);
    const locale = strogaLanguage || getLocales()[0]?.languageCode || "en";
    callback(locale);
    return locale; // Ek olarak locale döndürmek gerekiyor
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    defaultNS,
    fallbackLng: "en",
    compatibilityJSON: "v4",
    pluralSeparator: ".",
    returnEmptyString: false,
    resources,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });
