import { cn } from "@/utils/cn";
import { Text, TextProps } from "react-native";
import { ThemedText } from "../Themed/ThemedText";

export const FormDescription = (props: TextProps) => {
  return <ThemedText {...props} className={cn("text-xs font-light ", props?.className)} />;
};
