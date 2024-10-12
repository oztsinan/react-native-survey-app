import { SurveyDTO } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import { format } from "date-fns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const BottomTabSurveyStatistics = ({ data }: { data: SurveyDTO[] | undefined }) => {
  const { t } = useTranslation("SurveyModule");
  const { t: tCommon } = useTranslation("common");
  const sumCompletedSurveys = data?.length;
  const sumCompletedSurveysForToday = useMemo(() => {
    if (!data) return 0;

    const surveysForToday = data?.filter((survey) => {
      if (!survey.completedDate) return false;

      const completedDate = new Date(survey.completedDate);
      const today = new Date();

      return format(completedDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
    });

    return surveysForToday?.length;
  }, [data]);

  return (
    <View className="items-center gap-5 mb-5">
      <ThemedText className="font-bold">{t("completedSurveys")}</ThemedText>

      <View className="flex-row gap-5 justify-center">
        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">{sumCompletedSurveys}</ThemedText>
          <ThemedText className="text font-bold">{tCommon("total")}</ThemedText>
        </View>

        <View className="h-full w-px rounded-lg bg-muted" />

        <View className="grid gap-1 items-center">
          <ThemedText className="text-primary text-4xl">{sumCompletedSurveysForToday}</ThemedText>
          <ThemedText className="text font-bold">{tCommon("today")}</ThemedText>
        </View>
      </View>
    </View>
  );
};
