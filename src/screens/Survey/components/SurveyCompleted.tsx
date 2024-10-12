import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import { BrainTreeIcon } from "@/components/Icon/BrainTreeIcon";

export const SurveyCompleted = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <BrainTreeIcon style={{ marginBottom: 20 }} />
      <ThemedText className="text-xl font-bold">Anket Tamamlandı!</ThemedText>
      <ThemedText className="text-sm">Teşekkürler 🎉</ThemedText>
    </View>
  );
};
