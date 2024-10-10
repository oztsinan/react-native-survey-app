import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { cn } from "@/utils/cn";

type ThemedButtonProps = TouchableOpacityProps & {
  children: string;
};

export const ThemedButton = ({
  children,
  className,
  ...props
}: ThemedButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      className={cn("bg-primary p-3 px-5 rounded-full", className)}
    >
      <ThemedText className="text-primary-foreground">{children}</ThemedText>
    </TouchableOpacity>
  );
};
