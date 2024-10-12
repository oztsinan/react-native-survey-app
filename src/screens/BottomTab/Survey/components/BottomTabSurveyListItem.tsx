import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@/hook/useTheme";
import { SurveyDTO } from "@/api/Survey";
import { useTypedNavigation } from "@/hook/useTypedNavigation";
import { RootStackParams } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useSurveyStore } from "@/store/SurveyStore";

type BottomTabSurveyListItemProps = {
  item?: SurveyDTO;
};

export const BottomTabSurveyListItem = ({
  item,
}: BottomTabSurveyListItemProps) => {
  const navigation = useTypedNavigation<RootStackParams>();
  const { colors } = useTheme();
  const { setSurvey } = useSurveyStore();

  const onDetailPress = async () => {
    await setSurvey(item?.id!);
    useSurveyStore.persist.setOptions({ // zustand store'u persist etmek için survey id'sine göre yeni isim oluşturmak
      name: `survey-store-${item?.id}`,
    });

    useSurveyStore.persist.rehydrate(); // zustand store'u yeni isim kullanarak yeniden canlandırmak (rehydrate etmek)

    navigation.navigate(Routes.SURVEY, {
      id: item?.id!,
    });
  };

  return (
    <ListItem
      onPress={onDetailPress}
      className="flex-row items-center justify-between gap-2"
    >
      <View className="gap-1.5 flex-1">
        <ThemedText numberOfLines={1} className="text-primary text-sm">
          {item?.name}
        </ThemedText>
        <DateTimeInformation />
      </View>
      <Ionicons name="chevron-forward" size={17} color={colors?.foreground} />
    </ListItem>
  );
};

const DateTimeInformation = () => {
  const { colors } = useTheme();

  return (
    <View className="flex-row items-center gap-3">
      <View className="flex-row items-center gap-1">
        <Ionicons name="calendar-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">07.11.2023</ThemedText>
      </View>
      <View className="flex-row items-center gap-1">
        <Ionicons name="time-outline" size={14} color={colors?.primary} />
        <ThemedText className="text-xs font-light">11:27</ThemedText>
      </View>
    </View>
  );
};
