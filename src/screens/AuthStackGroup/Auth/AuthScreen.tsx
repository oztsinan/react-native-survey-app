import { ThemedText } from "@/components/ThemedText";
import { Assets } from "@/constants/Assets";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

export const AuthScreen = () => {
  return (
    <View className="flex-1 justify-end">
      <Image
        style={styles.image}
        source={Assets.images.background}
        contentFit="cover"
        transition={500}
      />
      <View className="w-full h-2/3 rounded-[40px] overflow-hidden">
        <View className="absolute w-full h-full bg-background opacity-60" />
        <BlurView className="flex-1 items-center gap-5 p-5">
          <View className="w-14 h-1 bg-border rounded-full" />
          <ThemedText className="text-2xl my-10">Hoşgeldiniz</ThemedText>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
  },
});
