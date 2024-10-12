import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import { BrainTreeIcon } from "@/components/Icon/BrainTreeIcon";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useSurveyStore } from "@/store/SurveyStore";
import { useTypedNavigation } from "@/hook/useTypedNavigation";
import { RootStackParams } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useTranslation } from "react-i18next";

export const SurveyCompleted = () => {
  const navigation = useTypedNavigation<RootStackParams>();

  const { t } = useTranslation("SurveyModule");
  const { survey, restartSurvey } = useSurveyStore();

  const onResultPress = () => {
    navigation.navigate(Routes.SURVEY_RESULT, {
      id: survey?.id!,
    });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <BrainTreeIcon style={{ marginBottom: 20 }} />
      <ThemedText className="text-xl font-bold">{t("surveyCompleted")}</ThemedText>
      <ThemedText className="text-sm">{t("thankYou")}</ThemedText>

      <View className="flex-col items-center gap-2">
        <ThemedButton onPress={restartSurvey} className="mt-5">
          {t("restartSurveyAlert.title")}
        </ThemedButton>

        <ThemedButton onPress={onResultPress} className="bg-green-500">
          {t("statistics")}
        </ThemedButton>
      </View>
    </View>
  );
};
