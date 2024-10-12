import { cn } from "@/utils/cn";
import { Text, TextProps } from "react-native";

export const ThemedText = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={cn("text-foreground font-comfortaa", className)}
      {...props}
    />
  );
};
