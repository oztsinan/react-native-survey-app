import { QuestionDTO } from "@/api/Survey";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";

export const SurveyQuestionSingleSelectItem = ({
  item,
}: {
  item: QuestionDTO;
}) => {
  return (
    <View className="w-screen p-5 items-center justify-center gap-5">
      <ThemedText className="text-center text-lg font-semibold">
        {item.text}
      </ThemedText>
      <View className="flex-row flex-wrap gap-2">
        {item?.options?.map((option, index) => (
          <ThemedButton disabled key={index}>
            {option?.text}
          </ThemedButton>
        ))}
      </View>
    </View>
  );
};
