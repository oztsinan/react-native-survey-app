import { StorageKeys } from "@/constants/StorageKeys";
import { useAuthStore } from "@/store/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import i18next from "i18next";
import { useColorScheme } from "nativewind";

export const useBottomTabProfileScreen = () => {
  const { user, setUser } = useAuthStore();
  const { setColorScheme } = useColorScheme();

  const [themeIndex, setThemeIndex] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);

  const onLogoutPress = async () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinize emin misiniz?", [
      {
        text: "Hayır",
        style: "cancel",
      },
      {
        text: "Evet",
        onPress: async () => {
          await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
          await AsyncStorage.removeItem(StorageKeys.REFRESH_TOKEN);
          setUser(undefined);
        },
        style: "destructive",
      },
    ]);
  };

  const onPrivacyPolicyPress = async () => {
    await WebBrowser.openBrowserAsync("https://eworldfulfillment.com/wp-content/uploads/2021/01/Privacy-Policy-Example-Template.pdf", {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    });
  };

  const onTermsAndConditionsPress = async () => {
    await WebBrowser.openBrowserAsync("https://www.termsfeed.com/public/uploads/2021/12/sample-terms-conditions-agreement.pdf", {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
    });
  };

  const onChangeTheme = async (index: any) => {
    setThemeIndex(index);

    if (index === 0) {
      // dark
      await AsyncStorage.setItem(StorageKeys.THEME, "dark");
      setColorScheme("dark");
    }

    if (index === 1) {
      // light
      await AsyncStorage.setItem(StorageKeys.THEME, "light");
      setColorScheme("light");
    }

    if (index === 2) {
      // system
      await AsyncStorage.setItem(StorageKeys.THEME, "system");
      setColorScheme("system");
    }
  };

  const onChangeLanguage = async (index: any) => {
    setLanguageIndex(index);

    if (index === 0) {
      // english
      await AsyncStorage.setItem(StorageKeys.LANGUAGE, "en");
      i18next.changeLanguage("en");
    }

    if (index === 1) {
      // turkish
      await AsyncStorage.setItem(StorageKeys.LANGUAGE, "tr");
      i18next.changeLanguage("tr");
    }
  };

  const getInitialValues = async () => {
    const theme = await AsyncStorage.getItem(StorageKeys.THEME);
    const language = await AsyncStorage.getItem(StorageKeys.LANGUAGE);

    if (theme === "dark") {
      setThemeIndex(0);
    }

    if (theme === "light") {
      setThemeIndex(1);
    }

    if (theme === "system") {
      setThemeIndex(2);
    }

    // az seçenek olduğu için dinamik yapıp kodu karmaşıklık oluşturmaması için sabit bir şekilde yazdım.

    if (language === "en") {
      setLanguageIndex(0);
    }

    if (language === "tr") {
      setLanguageIndex(1);
    }
  };

  useEffect(() => {
    getInitialValues();
  }, []);

  return {
    user,
    themeIndex,
    setThemeIndex,
    languageIndex,
    setLanguageIndex,
    onLogoutPress,
    onPrivacyPolicyPress,
    onTermsAndConditionsPress,
    onChangeTheme,
    onChangeLanguage,
  };
};
