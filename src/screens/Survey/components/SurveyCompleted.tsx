import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import { BrainTreeIcon } from "@/components/Icon/BrainTreeIcon";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useSurveyStore } from "@/store/SurveyStore";

export const SurveyCompleted = () => {
  const { restartSurvey } = useSurveyStore();

  return (
    <View className="flex-1 justify-center items-center">
      <BrainTreeIcon style={{ marginBottom: 20 }} />
      <ThemedText className="text-xl font-bold">Anket Tamamlandı!</ThemedText>
      <ThemedText className="text-sm">Teşekkürler 🎉</ThemedText>

      <ThemedButton onPress={restartSurvey} className="mt-5">
        Anketi Yeniden Başlat
      </ThemedButton>
    </View>
  );
};
