import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/hook/useTheme";

export const SurveyTimeOver = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 justify-center items-center">
      <MaterialCommunityIcons
        className="mb-5"
        name="timer-off-outline"
        size={150}
        color={colors?.destructive}
      />
      <ThemedText className="text-xl font-bold">Anket süresi doldu.</ThemedText>
      <ThemedText className="text-sm">
        Anket süresi dolduğu için cevap veremezsiniz.
      </ThemedText>
    </View>
  );
};
