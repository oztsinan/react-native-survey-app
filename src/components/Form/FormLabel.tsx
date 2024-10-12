import { cn } from "@/utils/cn";
import { TextProps } from "react-native";
import { ThemedText } from "../Themed/ThemedText";

export const FormLabel = (props: TextProps) => {
  return <ThemedText {...props} className={cn(props?.className)} />;
};
