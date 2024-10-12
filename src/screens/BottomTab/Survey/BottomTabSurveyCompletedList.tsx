import { useGetCompletedSurveysQuery } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import { ActivityIndicator, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { List } from "@/components/List/List";
import { BottomTabSurveyListItem } from "./components/BottomTabSurveyListItem";
import { useTheme } from "@/hook/useTheme";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const BottomTabSurveyCompletedList = () => {
  const { colors } = useTheme();
  const { data, isLoading, refetch } = useGetCompletedSurveysQuery();

  const renderSectionTitle = () => {
    return (
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons
          name="reorder-horizontal"
          size={20}
          color={colors?.["muted-foreground"]}
        />
        <ThemedText className="text-gray-400 text-sm">
          Tamamlanan Anketler
        </ThemedText>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (isLoading) {
    return <ActivityIndicator className="mx-auto" />;
  }

  if (data?.length === 0) {
    return null;
  }

  return (
    <List renderTitle={renderSectionTitle}>
      {data?.map((survey) => (
        <BottomTabSurveyListItem item={survey} key={survey.id} />
      ))}
    </List>
  );
};
