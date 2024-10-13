import { useTheme } from "@/hook/useTheme";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { ThemedText } from "@/components/Themed/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { GaugeProgress } from "@/components/Progress/GaugeProgress";
import { useSurveyStore } from "@/store/SurveyStore";
import { convertSecondsToTime } from "@/utils/time";

export const SurveyHeader = () => {
  const { top = 20 } = useSafeAreaInsets();
  const { survey, remainingTime } = useSurveyStore();

  const gaugeProgress = ((survey?.duration! - remainingTime) / survey?.duration!) * 100;

  return (
    <View
      style={{
        paddingTop: top,
      }}
      className="bg-primary w-full p-5 flex-col gap-5"
    >
      <View className="flex flex-row justify-between">
        <HomeButton />
        <GaugeProgress size={100} strokeWidth={10} progress={gaugeProgress} label={convertSecondsToTime(remainingTime)} />
      </View>

      <QuestionInformation />
    </View>
  );
};

const HomeButton = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} className="bg-white size-9 justify-center items-center rounded-full">
      <Entypo name="home" size={18} color={colors?.primary} />
    </TouchableOpacity>
  );
};

const QuestionInformation = () => {
  const { survey, activeQuestionIndex } = useSurveyStore();
  const activeQuestionCount = activeQuestionIndex + 1;
  const totalQuestion = survey?.questions?.length ?? 0;

  return (
    <View>
      <ThemedText className="text-white text-sm font-bold">{survey?.name}</ThemedText>

      <View className="flex-row items-center gap-2">
        <View className="h-[6px] bg-white/20 rounded-3xl flex-1 overflow-hidden">
          <View
            className="bg-white flex-1 rounded-3xl"
            style={{
              width: `${(activeQuestionCount / totalQuestion) * 100}%`,
            }}
          />
        </View>

        <ThemedText className="text-white text-sm">
          {activeQuestionCount}/<ThemedText className="text-xs text-white font-light">{survey?.questions.length}</ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};
