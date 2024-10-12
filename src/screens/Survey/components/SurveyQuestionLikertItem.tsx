import { QuestionDTO } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import { useSurveyStore } from "@/store/SurveyStore";
import { cn } from "@/utils/cn";
import { TouchableOpacity, View } from "react-native";

export const SurveyQuestionLikertItem = ({ item }: { item: QuestionDTO }) => {
  const { answers, setAnswer } = useSurveyStore();
  const likertOptions = [
    { text: "Çok İyi", value: 5, color: "#25C133" },
    { text: "İyi", value: 4, color: "#7ABC11" },
    { text: "Normal", value: 3, color: "#E3C700" },
    { text: "Kötü", value: 2, color: "#FF8B00" },
    { text: "Çok Kötü", value: 1, color: "#FF1D25" },
  ];

  return (
    <View className="w-screen p-5 items-center justify-center gap-5">
      <ThemedText className="text-center text-lg font-semibold">
        {item.text}
      </ThemedText>
      <View className="flex-row items-end h-[63px]">
        {likertOptions.map((option, index) => {
          const isActive = answers[item?.id]?.value == option?.value;

          return (
            <View
              key={index}
              style={{
                borderColor: isActive ? option?.color : "#f0f0f0",
              }}
              className={cn(
                "border-b-2 px-1 py-2 transition-all duration-500",
                {
                  "pb-5": isActive,
                }
              )}
            >
              <TouchableOpacity
                onPress={() => setAnswer(item?.id, option?.value)}
                style={{
                  backgroundColor: option?.color,
                }}
                className={cn(
                  "w-[63px] h-[40px] justify-center items-center rounded-lg"
                )}
              >
                <ThemedText className="text-sm text-white">
                  {option.text}
                </ThemedText>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};
