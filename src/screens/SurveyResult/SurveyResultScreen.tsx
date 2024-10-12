import { useGetSurveyByIdQuery } from "@/api/Survey";
import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { RootStackScreenProps } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, ScrollView, View } from "react-native";
import LottieView from "lottie-react-native";
import { Animations } from "@/assets/animations";

export const SurveyResultScreen = () => {
  const { t } = useTranslation("SurveyModule");
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
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerClassName="p-page items-center">
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          marginLeft: -20, // animasyonun solu daha fazla boşluk bırakıyor, ortalamak için -20 verdim
        }}
        source={Animations.Survey}
      />

      <List>
        <View className={"bg-green-500 p-3 px-4 rounded-lg"}>
          <ThemedText className="text-white">{data?.name}</ThemedText>
        </View>

        {questionsWithAnswers?.map((item, index) => (
          <ListItem className="gap-3" key={index}>
            <ThemedText className="text-sm font-bold">{item?.text}</ThemedText>
            <ThemedText className="text-sm">
              {t("answer")}: {item?.answer}
            </ThemedText>
            <ThemedText className="text-sm">
              {t("duration")}: {item?.answerCompletionTime} {t("second")}
            </ThemedText>
          </ListItem>
        ))}
      </List>
    </ScrollView>
  );
};
