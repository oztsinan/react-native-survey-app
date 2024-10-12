import { useSurveyStore } from "@/store/SurveyStore";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { SurveyQuestionItem } from "./SurveyQuestionItem";
import { SurveyTimeOver } from "./SurveyTimeOver";
import { SurveyCompleted } from "./SurveyCompleted";

export const SurveyQuestions = () => {
  const {
    survey,
    questionsListRef,
    remainingTime,
    completedDate,
    activeQuestionIndex,
  } = useSurveyStore();
  const isTimeOver = remainingTime === 0;

  if (!survey?.id) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (completedDate) {
    return <SurveyCompleted />;
  }

  if (isTimeOver) {
    return <SurveyTimeOver />;
  }

  if (survey?.id && questionsListRef) {
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
        onLayout={() => {
          if (survey?.id && questionsListRef.current) {
            questionsListRef.current.scrollToIndex({
              index: activeQuestionIndex,
              animated: false,
            });
          }
        }}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 100)); // 500ms bekleme süresi
          wait.then(() => {
            questionsListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
      />
    );
  }
};
