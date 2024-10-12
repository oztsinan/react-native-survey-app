import { ThemedButton } from "@/components/Themed/ThemedButton";
import { View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSurveyStore } from "@/store/SurveyStore";

export const SurveyFooter = () => {
  const {
    onPrevQuestion,
    onNextQuestion,
    setIsCompleted,
    activeQuestionIndex,
    survey,
    remainingTime,
    isCompleted,
  } = useSurveyStore();

  const { bottom = 20 } = useSafeAreaInsets();
  const isLastQuestion = activeQuestionIndex === survey?.questions?.length! - 1;
  const isTimeOver = remainingTime === 0;

  const onrNextQuestionHandler = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      // anketi bitir
    } else {
      onNextQuestion();
      // bir sonraki soruya geç
    }
  };

  return (
    <View
      style={{ marginBottom: bottom }}
      className="flex-row items-center gap-5"
    >
      <ThemedButton
        onPress={onPrevQuestion}
        disabled={activeQuestionIndex == 0 || isTimeOver || isCompleted}
        className="px-5 py-2"
      >
        <Octicons name="arrow-left" size={24} color="#918fda" />
      </ThemedButton>

      <ThemedButton
        onPress={onrNextQuestionHandler}
        disabled={isTimeOver || isCompleted}
      >
        {isLastQuestion ? "Bitir" : "Sonraki Soru"}
      </ThemedButton>
    </View>
  );
};
