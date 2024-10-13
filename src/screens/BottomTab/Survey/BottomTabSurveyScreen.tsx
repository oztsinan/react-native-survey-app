import { ActivityIndicator, ScrollView, View } from "react-native";
import { BottomTabSurveyStatistics } from "./components/BottomTabSurveyStatistics";
import { ThemedText } from "@/components/Themed/ThemedText";
import { useGetAvailableSurveysQuery, useGetCompletedSurveysQuery, useGetStartedSurveysQuery, useGetTimeoutSurveysQuery } from "@/api/Survey";
import { List } from "@/components/List/List";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@/hook/useTheme";
import { BottomTabSurveyListItem } from "./components/BottomTabSurveyListItem";
import { ListItem } from "@/components/List/ListItem";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const BottomTabSurveyScreen = () => {
  const { t } = useTranslation("SurveyModule");
  const { colors } = useTheme();
  const { data: completedSurveys, isLoading: completedSurveysLoading, refetch: refetchCompletedSurveys } = useGetCompletedSurveysQuery();
  const { data: availableSurveys, isLoading: availableSurveysLoading, refetch: refetchAvailableSurveys } = useGetAvailableSurveysQuery();
  const { data: startedSurveys, isLoading: startedSurveysLoading, refetch: refetchStartedSurveys } = useGetStartedSurveysQuery();
  const { data: timeoutSurveys, isLoading: timeoutSurveysLoading, refetch: refetchTimeoutSurveys } = useGetTimeoutSurveysQuery();

  const isLoading = completedSurveysLoading || availableSurveysLoading || startedSurveysLoading || timeoutSurveysLoading;

  const renderSectionTitle = (title: string) => {
    return (
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons name="reorder-horizontal" size={20} color={colors?.["muted-foreground"]} />
        <ThemedText className="text-gray-400 text-sm">{title}</ThemedText>
      </View>
    );
  };

  const renderAvailableSurveys = () => {
    if (availableSurveys?.length === 0) {
      return (
        <List renderTitle={() => renderSectionTitle("Anketler")}>
          <ListItem>
            <ThemedText className="text-sm">{t("noAvailableSurveys")} 🥺</ThemedText>
          </ListItem>
        </List>
      );
    }

    return (
      <List renderTitle={() => renderSectionTitle(t("surveys"))}>
        {availableSurveys?.map((survey) => <BottomTabSurveyListItem item={survey} key={survey.id} />)}
      </List>
    );
  };

  const renderStartedSurveys = () => {
    if (!startedSurveys?.length) return;

    return (
      <List renderTitle={() => renderSectionTitle(t("startedSurveys"))}>
        {startedSurveys?.map((survey) => <BottomTabSurveyListItem item={survey} key={survey.id} />)}
      </List>
    );
  };

  const renderCompletedSurveys = () => {
    if (!completedSurveys?.length) return;

    return (
      <List renderTitle={() => renderSectionTitle(t("completedSurveys"))}>
        {completedSurveys?.map((survey) => <BottomTabSurveyListItem item={survey} key={survey.id} />)}
      </List>
    );
  };

  const renderTimeoutSurveys = () => {
    if (!timeoutSurveys?.length) return;

    return (
      <List renderTitle={() => renderSectionTitle(t("timeoutSurveys"))}>
        {timeoutSurveys?.map((survey) => <BottomTabSurveyListItem item={survey} key={survey.id} />)}
      </List>
    );
  };

  useFocusEffect(
    useCallback(() => {
      refetchCompletedSurveys();
      refetchAvailableSurveys();
      refetchStartedSurveys();
      refetchTimeoutSurveys();
    }, [refetchCompletedSurveys, refetchAvailableSurveys, refetchStartedSurveys, refetchTimeoutSurveys]),
  );

  if (isLoading) {
    return <ActivityIndicator className="flex-1 mx-auto" />;
  }

  return (
    <ScrollView contentContainerClassName="p-page gap-page items-center" contentInsetAdjustmentBehavior="automatic">
      <BottomTabSurveyStatistics data={completedSurveys} />

      {renderAvailableSurveys()}
      {renderStartedSurveys()}
      {renderCompletedSurveys()}
      {renderTimeoutSurveys()}
    </ScrollView>
  );
};
