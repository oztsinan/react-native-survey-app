import { QuestionDTO } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { useSurveyStore } from "@/store/SurveyStore";
import { useTheme } from "@react-navigation/native";
import { hexToRgba } from "@/utils/color";
import { useMemo } from "react";
import Entypo from "@expo/vector-icons/Entypo";

type EntypoName = keyof typeof Entypo.glyphMap; // Entypo isimlerini al

export const SurveyQuestionSliderItem = ({ item }: { item: QuestionDTO }) => {
  const { colors } = useTheme();
  const { answers, setAnswer } = useSurveyStore();

  const emojiName = useMemo<EntypoName>(() => {
    const minValue = item?.minValue ?? 0;
    const maxValue = item?.maxValue ?? 10;
    const answer = answers[item?.id]?.value
    const midValue = ((minValue + maxValue) / 2)?.toExponential(2);

    // Tolerans aralığı
    const tolerance = 0.5;

    if (answer === minValue) {
      // eğer cevap min değerse
      return "emoji-sad";
    }

    if (answer === maxValue) {
      // eğer cevap max değerse
      return "emoji-happy";
    }

    // midValue ile answer arasındaki fark tolerans içinde mi kontrol et
    if (Math.abs((answer as number) - (midValue as any)) <= tolerance) {
      return "emoji-neutral";
    }

    // eğer min, max veya orta noktada değilse
    return "emoji-sad";
  }, [answers[item?.id]]);

  return (
    <View className="w-screen p-5 items-center justify-center gap-5">
      <ThemedText className="text-center text-lg font-semibold">
        {item.text}
      </ThemedText>

      <Entypo name={emojiName} size={150} color={colors.primary} />

      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={item?.minValue}
        maximumValue={item?.maxValue}
        thumbTintColor={colors.primary}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={hexToRgba(colors.primary, 20)}
        onValueChange={(value) => setAnswer(item?.id, value)}
        step={item?.step}
      />

      <ThemedText className="text-sm font-semibold">
        {answers[item?.id]?.value ?? "Lütfen Değer Seçiniz"}
      </ThemedText>
    </View>
  );
};
