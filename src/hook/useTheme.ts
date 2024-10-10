import { DarkTheme } from "@/theme/DarkTheme";
import { LightTheme } from "@/theme/LightTheme";
import { useColorScheme } from "nativewind";
import { useMemo } from "react";

export const useTheme = () => {
  const { colorScheme } = useColorScheme();

  const colors = useMemo(() => {
    return colorScheme === "dark" ? DarkTheme : LightTheme;
  }, [colorScheme]);

  return {
    colors,
  };
};
