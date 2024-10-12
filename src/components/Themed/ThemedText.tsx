import { cn } from "@/utils/cn";
import { Text, TextProps } from "react-native";

export const ThemedText = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn("font-comfortaa", className, {
        "text-foreground ": !(props?.style as any)?.color,
      })}
      {...props}
    />
  );
};
