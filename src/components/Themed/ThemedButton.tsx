import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";

type ThemedButtonProps = TouchableOpacityProps & {
  children: string | React.ReactNode;
  textClassName?: ClassValue;
  isLoading?: boolean;
};

export const ThemedButton = ({
  children,
  className,
  textClassName,
  isLoading,
  ...props
}: ThemedButtonProps) => {
  const renderContent = () => {
    if (typeof children === "string") {
      return (
        <ThemedText
          className={cn("font-semibold", textClassName, {
            "text-[#1D1D1B] opacity-40": props?.disabled,
            "text-primary-foreground": !props?.disabled,
            "opacity-40": isLoading,
          })}
        >
          {children}
        </ThemedText>
      );
    }

    return children;
  };

  return (
    <TouchableOpacity
      {...props}
      disabled={isLoading || props?.disabled}
      className={cn(
        " px-5 rounded-full flex-row items-center gap-2 h-[40px]",
        className,
        {
          "bg-[#efefff]": props?.disabled,
          "bg-primary":
            !props?.disabled && !(props.style as any)?.backgroundColor, // style içinde backgroundColor varsa primary rengini kullanma
        }
      )}
    >
      {isLoading && <ActivityIndicator color="#fff" />}
      {renderContent()}
    </TouchableOpacity>
  );
};
