import { View } from "react-native";
import { ThemedText } from "../Themed/ThemedText";
import { useTheme } from "@/hook/useTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type ScreenHeaderProps = {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

export const ScreenHeader = ({ title, icon }: ScreenHeaderProps) => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-1">
      <MaterialCommunityIcons name={icon} size={17} color={colors?.primary} />
      <ThemedText className="font-bold text-primary">{title?.toLocaleUpperCase()}</ThemedText>
    </View>
  );
};
