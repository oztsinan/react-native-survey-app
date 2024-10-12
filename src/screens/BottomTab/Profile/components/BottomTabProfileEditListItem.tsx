import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@/hook/useTheme";

type BottomTabProfileEditListItemProps = {
  title: string;
  value: string | undefined;
};

export const BottomTabProfileEditListItem = ({
  title,
  value,
}: BottomTabProfileEditListItemProps) => {
  const { colors } = useTheme();

  return (
    <ListItem
      onPress={() => {}}
      className="flex-row justify-between items-center"
    >
      <View className="grid gap-1">
        <ThemedText className="text-sm">{title}</ThemedText>
        <ThemedText className="text-xs">{value}</ThemedText>
      </View>
      <FontAwesome6 name="edit" size={22} color={colors?.primary} />
    </ListItem>
  );
};
