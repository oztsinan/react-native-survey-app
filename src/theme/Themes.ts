import { vars } from "nativewind";
import { LightTheme } from "./LightTheme";
import { DarkTheme } from "./DarkTheme";

export const Themes = {
  light: LightTheme,
  dark: DarkTheme,
};

export const nativewindTheme = {
  light: vars(Themes.light),
  dark: vars(Themes.dark),
};
