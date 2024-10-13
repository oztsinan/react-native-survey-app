import { cn } from "@/utils/cn";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export const ListItem = (props: TouchableOpacityProps) => {
  return <TouchableOpacity {...props} activeOpacity={props?.onPress ? 0.2 : 1} className={cn("bg-muted p-3 px-4 rounded-lg", props?.className)} />;
};
