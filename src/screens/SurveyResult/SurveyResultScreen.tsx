import { useGetSurveyByIdQuery } from "@/api/Survey";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { RootStackScreenProps } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { ActivityIndicator, ScrollView } from "react-native";

export const SurveyResultScreen = () => {
  const { params } = useRoute<RootStackScreenProps<Routes.SURVEY_RESULT>["route"]>();
  const { data, isLoading } = useGetSurveyByIdQuery(params?.id);

  const questionsWithAnswers = useMemo(() => {
    if (!data?.answers) {
      return [];
    }

    return data?.questions.map((question) => {
      const answer = data?.answers?.[question.id];
      let finalAnswer = answer?.value;

      // eğer cevap bir GUID ise, options içinden karşılık gelen text'i buluyoruz
      if (question.options && typeof answer?.value === "string") {
        const selectedOption = question.options.find((option) => option.id === answer?.value);
        finalAnswer = selectedOption?.text || finalAnswer;
      }

      return {
        text: question.text,
        answer: finalAnswer,
        answerCompletionTime: answer?.completionTime,
      };
    });
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerClassName="p-page">
      <List>
        <ListItem className="bg-green-600">
          <ThemedText className="text-white">{data?.name}</ThemedText>
        </ListItem>
        {questionsWithAnswers?.map((item, index) => (
          <ListItem className="gap-3" key={index}>
            <ThemedText className="text-sm font-bold">{item?.text}</ThemedText>
            <ThemedText className="text-sm">Cevap : {item?.answer}</ThemedText>
            <ThemedText className="text-sm">Süre : {item?.answerCompletionTime} saniye</ThemedText>
          </ListItem>
        ))}
      </List>
    </ScrollView>
  );
};
