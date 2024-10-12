import { ScrollView } from "react-native";
import { BottomTabSurveyStatistics } from "./components/BottomTabSurveyStatistics";
import { BottomTabSurveyAvailableList } from "./BottomTabSurveyAvailableList";
import { BottomTabSurveyCompletedList } from "./BottomTabSurveyCompletedList";
import { BottomTabSurveyTimeoutList } from "./BottomTabSurveyTimeoutList";

export const BottomTabSurveyScreen = () => {
  return (
    <ScrollView
      contentContainerClassName="p-page gap-page items-center"
      contentInsetAdjustmentBehavior="automatic"
    >
      <BottomTabSurveyStatistics />
      <BottomTabSurveyCompletedList />
      <BottomTabSurveyAvailableList />
      <BottomTabSurveyTimeoutList />
    </ScrollView>
  );
};
