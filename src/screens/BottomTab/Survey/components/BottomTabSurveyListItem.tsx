import { ThemedText } from "@/components/Themed/ThemedText";
import { Alert, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hook/useTheme";
import { SurveyDTO } from "@/api/Survey";
import { useTypedNavigation } from "@/hook/useTypedNavigation";
import { RootStackParams } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useSurveyStore } from "@/store/SurveyStore";
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { useState } from "react";
import { baseFormatDate } from "@/utils/date";

type BottomTabSurveyListItemProps = {
  item?: SurveyDTO;
};

export const BottomTabSurveyListItem = ({ item }: BottomTabSurveyListItemProps) => {
  const navigation = useTypedNavigation<RootStackParams>();
  const shareValue = useSharedValue(0);

  const { colors } = useTheme();
  const { setSurvey, restartSurvey } = useSurveyStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const onStartPress = async () => {
    Alert.alert("Anket başlatılacaktır", "Anketi başlatmak istediğinize emin misiniz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Başlat",
        onPress: async () => {
          await setSurvey(item?.id!);
          useSurveyStore.persist.setOptions({
            // zustand store'u persist etmek için survey id'sine göre yeni isim oluşturmak
            name: `survey-store-${item?.id}`,
          });
          useSurveyStore.persist.rehydrate(); // zustand store'u yeni isim kullanarak yeniden canlandırmak (rehydrate etmek)

          navigation.navigate(Routes.SURVEY, {
            id: item?.id!,
          });
        },
      },
    ]);
  };

  const onContinuePress = async () => {
    await setSurvey(item?.id!);
    useSurveyStore.persist.setOptions({
      name: `survey-store-${item?.id}`,
    });
    useSurveyStore.persist.rehydrate();
    navigation.navigate(Routes.SURVEY, {
      id: item?.id!,
    });
  };

  const onRestartPress = () => {
    Alert.alert("Anket tekrar başlatılacaktır", "Anketi tekrar başlatmak istediğinize emin misiniz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      {
        text: "Başlat",
        onPress: async () => {
          await setSurvey(item?.id!);
          useSurveyStore.persist.setOptions({
            name: `survey-store-${item?.id}`,
          });
          useSurveyStore.persist.rehydrate();
          restartSurvey();

          navigation.navigate(Routes.SURVEY, {
            id: item?.id!,
          });
        },
      },
    ]);
  };

  const onResultPress = () => {
    navigation.navigate(Routes.SURVEY_RESULT, {
      id: item?.id!,
    });
  };

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${interpolate(shareValue.value, [0, 1], [0, 90])}deg`,
        },
      ],
    };
  });

  const toggleButton = () => {
    if (shareValue.value === 0) {
      shareValue.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
      setIsExpanded(true);
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
      setIsExpanded(false);
    }
  };

  return (
    <TouchableOpacity onPress={toggleButton} className="flex-col gap-2 bg-muted p-3 px-4 rounded-lg">
      <View className="flex-row items-center gap-2">
        <View className="gap-1.5 flex-1">
          <ThemedText numberOfLines={1} className="text-primary text-sm">
            {item?.name}
          </ThemedText>
          <DateTimeInformation completedDate={item?.completedDate} />
        </View>

        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-forward" size={17} color={colors?.foreground} />
        </Animated.View>
      </View>

      {isExpanded && (
        <View className="flex-row justify-end gap-2">
          {item?.completedDate && (
            <ThemedButton onPress={onResultPress} className="h-9 px-4" textClassName="text-sm">
              İstatistikler
            </ThemedButton>
          )}

          {!item?.completedDate && !item?.isTimeout && (
            <ThemedButton onPress={item?.isStarted ? onContinuePress : onStartPress} className="h-9 px-4 bg-green-500" textClassName="text-sm">
              {item?.isStarted ? "Devam Et" : "Başlat"}
            </ThemedButton>
          )}

          {(item?.completedDate || item?.isTimeout) && (
            <ThemedButton onPress={onRestartPress} className="h-9 px-4 bg-green-500" textClassName="text-sm">
              Tekrar
            </ThemedButton>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const DateTimeInformation = ({ completedDate }: { completedDate?: string }) => {
  const { colors } = useTheme();

  if (!completedDate) return;

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-row items-center gap-1">
        <Ionicons name="calendar-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">{baseFormatDate(completedDate, "dd.MM.yyyy")}</ThemedText>
      </View>
      <View className="flex-row items-center gap-1">
        <Ionicons name="time-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">{baseFormatDate(completedDate, "HH:mm")}</ThemedText>
      </View>
    </View>
  );
};
