import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/hook/useTheme";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useSurveyStore } from "@/store/SurveyStore";

export const SurveyTimeOver = () => {
  const { colors } = useTheme();
  const { restartSurvey } = useSurveyStore();

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

      <ThemedButton onPress={restartSurvey} className="mt-5">
        Anketi Yeniden Başlat
      </ThemedButton>
    </View>
  );
};
