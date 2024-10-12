import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import { BrainTreeIcon } from "@/components/Icon/BrainTreeIcon";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useSurveyStore } from "@/store/SurveyStore";
import { useTypedNavigation } from "@/hook/useTypedNavigation";
import { RootStackParams } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";

export const SurveyCompleted = () => {
  const navigation = useTypedNavigation<RootStackParams>();
  const { survey, restartSurvey } = useSurveyStore();

  const onResultPress = () => {
    navigation.navigate(Routes.SURVEY_RESULT, {
      id: survey?.id!,
    });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <BrainTreeIcon style={{ marginBottom: 20 }} />
      <ThemedText className="text-xl font-bold">Anket Tamamlandı!</ThemedText>
      <ThemedText className="text-sm">Teşekkürler 🎉</ThemedText>

      <View className="flex-col items-center gap-2">
        <ThemedButton onPress={restartSurvey} className="mt-5">
          Anketi Yeniden Başlat
        </ThemedButton>

        <ThemedButton onPress={onResultPress} className="bg-green-500">
          Sonuçları Gör
        </ThemedButton>
      </View>
    </View>
  );
};
