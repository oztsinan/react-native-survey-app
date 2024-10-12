import { cn } from "@/utils/cn";
import { View } from "react-native";

export const DotsIndicator = ({
  count = 3,
  activeIndex = 0,
}: {
  count?: number;
  activeIndex?: number;
}) => {
  return (
    <View className="flex-row gap-1 mx-auto">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <View
            key={index}
            className={cn("h-2 rounded-full transition-all", {
              "w-6 bg-primary": activeIndex === index,
              "w-4 bg-border opacity-70": activeIndex !== index,
            })}
          />
        ))}
    </View>
  );
};
