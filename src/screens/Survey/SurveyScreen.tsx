import { useEffect } from "react";
import { SurveyHeader } from "./components/SurveyHeader";
import { useSurveyStore } from "@/store/SurveyStore";
import { View } from "react-native";
import { SurveyFooter } from "./components/SurveyFooter";
import { SurveyQuestions } from "./components/SurveyQuestions";

export const SurveyScreen = () => {
  const { start, stop } = useSurveyStore();

  useEffect(() => {
    start(); // component mount olduğunda başlar

    return () => stop(); // component unmount olduğunda interval temizlenir
  }, []);

  return (
    <View className="flex-1 flex-col items-center gap-5">
      <SurveyHeader />
      <SurveyQuestions />
      <SurveyFooter />
    </View>
  );
};
