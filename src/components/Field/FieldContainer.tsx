import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { View } from "react-native";

export const FieldContainer = ({
  children,
  className,
  error,
  focused,
}: {
  children: React.ReactNode;
  className?: ClassValue;
  error?: string;
  focused?: boolean;
}) => {
  return (
    <View
      className={cn(
        "bg-background h-12 rounded-lg px-4 border transition-all",
        className,
        {
          "border-destructive": error,
          "border-primary": focused && !error,
          "border-transparent": !error && !focused,
        }
      )}
    >
      {children}
    </View>
  );
};
