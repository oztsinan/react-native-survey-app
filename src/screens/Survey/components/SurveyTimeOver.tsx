import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/hook/useTheme";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useSurveyStore } from "@/store/SurveyStore";
import { useTranslation } from "react-i18next";

export const SurveyTimeOver = () => {
  const { t } = useTranslation("SurveyModule");
  const { colors } = useTheme();
  const { restartSurvey } = useSurveyStore();

  return (
    <View className="flex-1 justify-center items-center">
      <MaterialCommunityIcons className="mb-5" name="timer-off-outline" size={150} color={colors?.destructive} />

      <ThemedText className="text-xl font-bold">{t("surveyTimeOver")}</ThemedText>
      <ThemedText className="text-sm">{t("surveyTimeOverDescription")}</ThemedText>

      <ThemedButton onPress={restartSurvey} className="mt-5">
        {t("restartSurveyAlert.title")}
      </ThemedButton>
    </View>
  );
};
