import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { List } from "@/components/List/List";
import { ThemedText } from "@/components/Themed/ThemedText";
import { ScrollView, View } from "react-native";
import { useTheme } from "@/hook/useTheme";
import { BottomTabSurveyStatistics } from "./components/BottomTabSurveyStatistics";
import { BottomTabSurveyListItem } from "./components/BottomTabSurveyListItem";
import { useGetAllSurveysQuery } from "@/api/Survey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const BottomTabSurveyScreen = () => {
  const { colors } = useTheme();
  const { data } = useGetAllSurveysQuery();

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

  const getAllPersistedData = async () => {
    try {
      // Tüm saklanan anahtarları al
      const keys = await AsyncStorage.getAllKeys();

      // Tüm anahtarlara bağlı verileri çek
      const result = await AsyncStorage.multiGet(keys);

      // Her bir anahtar ve değeri logla
      // result.forEach(([key, value]) => {
      //   console.log("Key:", key);
      //   console.log("Value:", value);
      // });
    } catch (error) {
      console.error("Persist edilen verileri çekerken hata oluştu:", error);
    }
  };

  useEffect(() => {
    getAllPersistedData();
  }, []);

  return (
    <ScrollView
      contentContainerClassName="p-page gap-page items-center"
      contentInsetAdjustmentBehavior="automatic"
    >
      <BottomTabSurveyStatistics />
      <List renderTitle={renderSectionTitle}>
        {data?.map((survey) => (
          <BottomTabSurveyListItem item={survey} key={survey.id} />
        ))}
      </List>
    </ScrollView>
  );
};
