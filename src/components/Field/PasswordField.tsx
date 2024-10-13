import { cn } from "@/utils/cn";
import { TextInput, TextInputProps, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, forwardRef } from "react";
import { useTheme } from "@/hook/useTheme";
import { FieldContainer } from "./FieldContainer";

type PasswordFieldProps = TextInputProps & {
  error?: string;
};

export const PasswordField = forwardRef<TextInput, PasswordFieldProps>((props: PasswordFieldProps, ref) => {
  const [focused, setFocused] = useState(false);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);
  const { colors } = useTheme();

  return (
    <FieldContainer focused={focused} error={props?.error} className={cn("flex flex-row items-center", props?.className)}>
      <TextInput
        {...props}
        ref={ref} // ref'i TextInput'a ilettik
        secureTextEntry={isSecureTextEntry}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 text-foreground"
      />

      <TouchableOpacity onPress={() => setIsSecureTextEntry((prev) => !prev)}>
        <Ionicons name={isSecureTextEntry ? "eye-off-outline" : "eye-outline"} size={20} color={colors?.border} />
      </TouchableOpacity>
    </FieldContainer>
  );
});

PasswordField.displayName = "PasswordField";
