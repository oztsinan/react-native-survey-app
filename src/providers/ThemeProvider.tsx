import { View } from "react-native";
import { DarkTheme as RNDarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { nativewindTheme } from "../theme/Themes";
import { useCallback, useEffect } from "react";
import { useColorScheme } from "nativewind";
import { LightTheme } from "../theme/LightTheme";
import { DarkTheme } from "../theme/DarkTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { navigationRef } from "@/utils/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const DarkValue = {
    dark: true,
    colors: {
      ...RNDarkTheme.colors,
      primary: DarkTheme.primary,
      background: DarkTheme.background,
    },
  };

  const LightValue = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: LightTheme.primary,
      background: LightTheme.background,
    },
  };

  const initalStorageKeys = useCallback(async () => {
    const storageTheme = await AsyncStorage.getItem(StorageKeys.THEME);
    setColorScheme(storageTheme as "light" | "dark" | "system");
  }, [setColorScheme]);

  useEffect(() => {
    initalStorageKeys();
  }, [initalStorageKeys]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} theme={colorScheme === "dark" ? DarkValue : LightValue}>
        <View
          // nativeWind tema değişikliklerini sağlayan değişkenler
          style={nativewindTheme?.[colorScheme as "light"]}
          className="flex-1"
        >
          {children}
        </View>
        <StatusBar style="auto" />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
