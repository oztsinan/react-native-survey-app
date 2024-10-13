import { QuestionDTO } from "@/api/Survey";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { useTheme } from "@/hook/useTheme";
import { useSurveyStore } from "@/store/SurveyStore";
import { useColorScheme } from "nativewind";
import { View } from "react-native";

export const SurveyQuestionSingleSelectItem = ({ item }: { item: QuestionDTO }) => {
  const { colorScheme } = useColorScheme();
  const { colors } = useTheme();
  const { answers, setAnswer } = useSurveyStore();

  return (
    <View className="w-screen p-5 items-center justify-center gap-5">
      <ThemedText className="text-center text-lg font-semibold">{item.text}</ThemedText>
      <View className="flex-row flex-wrap gap-2">
        {item?.options?.map((option, index) => {
          const isActive = answers[item?.id]?.value === option?.id;

          return (
            <ThemedButton
              key={index}
              style={{
                backgroundColor: isActive ? colors?.primary : colorScheme === "light" ? "#efefff" : "#1D1D1B",
              }}
              textStyle={{
                color: isActive ? colors?.["primary-foreground"] : colorScheme === "light" ? "#1D1D1B" : "#efefff",
                opacity: isActive ? 1 : 0.4,
              }}
              onPress={() => setAnswer(item?.id, option?.id)}
            >
              {option?.text}
            </ThemedButton>
          );
        })}
      </View>
    </View>
  );
};
