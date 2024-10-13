import { BlurView } from "expo-blur";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HandleIndicator } from "./HandleIndicator";

export const BlurViewContainer = ({ children }: { children: React.ReactNode }) => {
  const { bottom = 20 } = useSafeAreaInsets();

  return (
    <View className="w-full h-2/3 overflow-hidden rounded-t-[40px]">
      <View className="absolute w-full h-full bg-background opacity-60" />
      <BlurView
        intensity={20}
        className="flex-1 w-screen justify-between gap-5 py-5"
        style={{
          paddingBottom: bottom,
        }}
      >
        <HandleIndicator />
        {children}
      </BlurView>
    </View>
  );
};
