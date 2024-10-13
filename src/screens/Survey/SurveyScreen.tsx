import { useEffect } from "react";
import { SurveyHeader } from "./components/SurveyHeader";
import { useSurveyStore } from "@/store/SurveyStore";
import { View } from "react-native";
import { SurveyFooter } from "./components/SurveyFooter";
import { SurveyQuestions } from "./components/SurveyQuestions";
import { StatusBar } from "expo-status-bar";

export const SurveyScreen = () => {
  const { survey, completedDate, start, stop } = useSurveyStore();

  useEffect(() => {
    if (survey?.id && !completedDate) {
      start();
    }

    return () => stop(); // component unmount olduğunda interval temizlenir
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [survey, completedDate]);

  return (
    <View className="flex-1 flex-col items-center gap-5">
      <SurveyHeader />
      <SurveyQuestions />
      <SurveyFooter />
      <StatusBar style="light" />
    </View>
  );
};
