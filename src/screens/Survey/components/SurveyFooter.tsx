import { ThemedButton } from "@/components/Themed/ThemedButton";
import { View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSurveyStore } from "@/store/SurveyStore";
import { useTranslation } from "react-i18next";

export const SurveyFooter = () => {
  const { onPrevQuestion, onNextQuestion, activeQuestionIndex, survey, answers, remainingTime, completedDate } = useSurveyStore();

  const { t } = useTranslation("SurveyModule");
  const { bottom = 20 } = useSafeAreaInsets();
  const isLastQuestion = activeQuestionIndex === survey?.questions?.length! - 1;
  const isTimeOver = remainingTime === 0;
  const isSelectedAnswer = !!answers[survey?.questions[activeQuestionIndex]?.id!]?.value;

  const onNextQuestionHandler = () => {
    onNextQuestion();
  };

  return (
    <View style={{ marginBottom: bottom }} className="flex-row items-center gap-5">
      <ThemedButton onPress={onPrevQuestion} disabled={activeQuestionIndex === 0 || isTimeOver || !!completedDate} className="px-5 py-2">
        <Octicons name="arrow-left" size={24} color="#918fda" />
      </ThemedButton>

      <ThemedButton onPress={onNextQuestionHandler} disabled={isTimeOver || !!completedDate || !isSelectedAnswer}>
        {isLastQuestion ? t("finish") : t("nextQuestion")}
      </ThemedButton>
    </View>
  );
};
