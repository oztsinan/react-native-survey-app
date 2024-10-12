import { SurveyDTO } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import { format } from "date-fns";
import { useMemo } from "react";
import { View } from "react-native";

export const BottomTabSurveyStatistics = ({
  data,
}: {
  data: SurveyDTO[] | undefined;
}) => {
  const sumCompletedSurveys = data?.length;
  const sumCompletedSurveysForToday = useMemo(() => {
    if (!data) return 0;

    const surveysForToday = data?.filter((survey) => {
      if (!survey.completedDate) return false;

      const completedDate = new Date(survey.completedDate);
      const today = new Date();

      return (
        format(completedDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      );
    });

    return surveysForToday?.length;
  }, [data]);

  return (
    <View className="items-center gap-5 mb-5">
      <ThemedText className="font-bold">Tamamlanan Anketler</ThemedText>

      <View className="flex-row gap-5 justify-center">
        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">
            {sumCompletedSurveys}
          </ThemedText>
          <ThemedText className="text font-bold">Toplam</ThemedText>
        </View>

        <View className="h-full w-px rounded-lg bg-muted" />

        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">
            {sumCompletedSurveysForToday}
          </ThemedText>
          <ThemedText className="text font-bold">Bugün</ThemedText>
        </View>
      </View>
    </View>
  );
};
