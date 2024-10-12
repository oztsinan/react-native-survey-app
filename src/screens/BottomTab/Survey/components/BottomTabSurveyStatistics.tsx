import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";

export const BottomTabSurveyStatistics = () => {
  return (
    <View className="items-center gap-5 mb-5">
      <ThemedText className="font-bold">Tamamlanan Anketler</ThemedText>

      <View className="flex-row gap-5 justify-center">
        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">30</ThemedText>
          <ThemedText className="text font-bold">Puan</ThemedText>
        </View>

        <View className="h-full w-px rounded-lg bg-muted" />

        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">7</ThemedText>
          <ThemedText className="text font-bold">Toplam</ThemedText>
        </View>

        <View className="h-full w-px rounded-lg bg-muted" />

        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">2</ThemedText>
          <ThemedText className="text font-bold">Bugün</ThemedText>
        </View>
      </View>
    </View>
  );
};
