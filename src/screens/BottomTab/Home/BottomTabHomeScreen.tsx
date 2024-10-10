import { Assets } from "@/constants/Assets";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { useTypedNavigation } from "@/hook/useTypedNavigation";
import { BottomTabParams } from "@/navigations/RootStackParams";
import { Routes } from "@/navigations/Routes";
import { useTheme } from "@/hook/useTheme";

export const BottomTabHomeScreen = () => {
  const navigation = useTypedNavigation<BottomTabParams>();
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerClassName="flex items-center gap-10"
      bounces={false}
    >
      <View className="w-full h-[500px]">
        <Image
          source={Assets.images.background}
          contentFit="cover"
          contentPosition="top"
          style={{ width: "100%", height: "100%" }}
        />

        <LinearGradient
          colors={["transparent", "transparent", colors?.background]}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </View>

      <ThemedText className="text-lg">
        Merhaba{" "}
        <ThemedText className="text-lg text-primary">Kullanıcı Adı</ThemedText>
      </ThemedText>

      <ThemedButton
        onPress={() => navigation.navigate(Routes.BOTTOM_TAB_SURVEY)}
        className="px-7"
      >
        Ankete Başla
      </ThemedButton>
    </ScrollView>
  );
};
