import { useGetAvailableSurveysQuery } from "@/api/Survey";
import { ThemedText } from "@/components/Themed/ThemedText";
import { ActivityIndicator, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { List } from "@/components/List/List";
import { BottomTabSurveyListItem } from "./components/BottomTabSurveyListItem";
import { useTheme } from "@/hook/useTheme";
import { ListItem } from "@/components/List/ListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export const BottomTabSurveyAvailableList = () => {
  const { colors } = useTheme();
  const { data, isLoading, refetch } = useGetAvailableSurveysQuery();

  const renderSectionTitle = () => {
    return (
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons
          name="reorder-horizontal"
          size={20}
          color={colors?.["muted-foreground"]}
        />
        <ThemedText className="text-gray-400 text-sm">Anketler</ThemedText>
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
    return (
      <List renderTitle={renderSectionTitle}>
        <ListItem>
          <ThemedText className="text-sm">
            Henüz anket bulunmamaktadır.
          </ThemedText>
        </ListItem>
      </List>
    );
  }

  return (
    <List renderTitle={renderSectionTitle}>
      {data?.map((survey) => (
        <BottomTabSurveyListItem item={survey} key={survey.id} />
      ))}
    </List>
  );
};
