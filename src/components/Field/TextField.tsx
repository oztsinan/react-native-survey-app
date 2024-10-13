import { cn } from "@/utils/cn";
import { useState, forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { FieldContainer } from "./FieldContainer";

type TextFieldProps = TextInputProps & {
  error?: string;
};

export const TextField = forwardRef<TextInput, TextFieldProps>((props: TextFieldProps, ref) => {
  const [focused, setFocused] = useState(false);

  return (
    <FieldContainer focused={focused} error={props?.error} className={cn("flex flex-row items-center", props?.className)}>
      <TextInput
        {...props}
        ref={ref} // refi TextInput'a ilettik
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 text-foreground"
      />
    </FieldContainer>
  );
});

TextField.displayName = "TextField";
