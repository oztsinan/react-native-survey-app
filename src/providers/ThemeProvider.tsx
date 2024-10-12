import { View } from "react-native";
import {
  DarkTheme as RNDarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { nativewindTheme } from "../theme/Themes";
import { useEffect } from "react";
import { useColorScheme } from "nativewind";
import { LightTheme } from "../theme/LightTheme";
import { DarkTheme } from "../theme/DarkTheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { navigationRef } from "@/utils/navigation";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();

  const value =
    colorScheme === "dark"
      ? {
          dark: true,
          colors: {
            ...RNDarkTheme.colors,
            primary: DarkTheme.primary,
            background: DarkTheme.background,
          },
        }
      : {
          dark: false,
          colors: {
            ...DefaultTheme.colors,
            primary: LightTheme.primary,
            background: LightTheme.background,
          },
        };

  const initalStorageKeys = () => {
    //     const theme = appStorage.getString(StorageKeys.THEME);
    //     if (!theme) {
    //       appStorage.set(StorageKeys.THEME, "system");
    //     }
  };

  useEffect(() => {
    initalStorageKeys();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef} theme={value}>
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
