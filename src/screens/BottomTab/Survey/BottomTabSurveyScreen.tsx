import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView, View } from "react-native";
import { useTheme } from "@/hook/useTheme";
import { BottomTabSurveyStatistics } from "./components/BottomTabSurveyStatistics";
import { BottomTabSurveyListItem } from "./components/BottomTabSurveyListItem";

export const BottomTabSurveyScreen = () => {
  const { colors } = useTheme();

  const renderSectionTitle = () => {
    return (
      <View className="flex-row items-center gap-1">
        <MaterialCommunityIcons
          name="reorder-horizontal"
          size={20}
          color={colors?.["muted-foreground"]}
        />
        <ThemedText className="text-gray-400 text-sm">Liste</ThemedText>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerClassName="p-page gap-page items-center"
      contentInsetAdjustmentBehavior="automatic"
    >
      <BottomTabSurveyStatistics />
      <List renderTitle={renderSectionTitle}>
        <BottomTabSurveyListItem />
        <BottomTabSurveyListItem />
      </List>
    </ScrollView>
  );
};
