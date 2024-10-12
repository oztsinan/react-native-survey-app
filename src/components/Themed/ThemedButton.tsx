import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
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
  textStyle?: StyleProp<TextStyle>;
};

export const ThemedButton = ({
  children,
  className,
  textClassName,
  isLoading,
  textStyle,
  ...props
}: ThemedButtonProps) => {
  const renderContent = () => {
    if (typeof children === "string") {
      return (
        <ThemedText
          className={cn("font-semibold", textClassName, {
            "text-[#1D1D1B] opacity-40":
              props?.disabled && !(textStyle as any)?.color,
            "text-primary-foreground":
              !props?.disabled && !(textStyle as any)?.color,
            "opacity-40": isLoading,
          })}
          style={textStyle}
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
      style={props?.style}
    >
      {isLoading && <ActivityIndicator color="#fff" />}
      {renderContent()}
    </TouchableOpacity>
  );
};
