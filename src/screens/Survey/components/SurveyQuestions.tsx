import { useSurveyStore } from "@/store/SurveyStore";
import { Dimensions, FlatList } from "react-native";
import { SurveyQuestionItem } from "./SurveyQuestionItem";
import { SurveyTimeOver } from "./SurveyTimeOver";
import { SurveyCompleted } from "./SurveyCompleted";

export const SurveyQuestions = () => {
  const { survey, questionsListRef, remainingTime, isCompleted } =
    useSurveyStore();
  const isTimeOver = remainingTime === 0;

  if (isCompleted) {
    return <SurveyCompleted />;
  }

  if (isTimeOver) {
    return <SurveyTimeOver />;
  }

  return (
    <FlatList
      ref={questionsListRef}
      data={survey?.questions}
      scrollEnabled={false}
      keyExtractor={(item) => item?.id + "key"}
      horizontal
      snapToAlignment="center"
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="flex-1"
      snapToInterval={Dimensions.get("window").width}
      decelerationRate="fast"
      renderItem={({ item }) => <SurveyQuestionItem item={item} />}
    />
  );
};
