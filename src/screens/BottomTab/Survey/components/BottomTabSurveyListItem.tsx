import { ListItem } from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hook/useTheme";

export const BottomTabSurveyListItem = () => {
  const { colors } = useTheme();

  return (
    <ListItem
      onPress={() => {}}
      className="flex-row items-center justify-between gap-2"
    >
      <View className="gap-1.5 flex-1">
        <ThemedText numberOfLines={1} className="text-primary text-sm">
          Anket
        </ThemedText>
        <DateTimeInformation />
      </View>
      <Ionicons name="chevron-forward" size={17} color={colors?.foreground} />
    </ListItem>
  );
};

const DateTimeInformation = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-row items-center gap-1">
        <Ionicons name="calendar-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">07.11.2023</ThemedText>
      </View>
      <View className="flex-row items-center gap-1">
        <Ionicons name="time-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">11:27</ThemedText>
      </View>
    </View>
  );
};
