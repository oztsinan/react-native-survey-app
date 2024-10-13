import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { FieldContainer } from "./FieldContainer";
import React, { forwardRef } from "react";
import { BaseDateTimePicker } from "../Base/BaseDateTimePicker";
import { StyleSheet } from "react-native";

type DatePickerFieldProps = {
  value: string | undefined | null;
  className?: ClassValue;
  error?: string;
  mode?: "date" | "time" | "datetime";
  minimumDate?: Date | undefined;
  maximumDate?: Date | undefined;
  onChange: (value: string) => void;
};

export const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(
  ({ value, className, error, mode, maximumDate, minimumDate, onChange }: DatePickerFieldProps, ref) => {
    return (
      <FieldContainer focused={false} error={error} className={cn("flex flex-row items-center", className)}>
        <BaseDateTimePicker
          value={value ? new Date(value) : new Date()}
          mode={mode}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={(e, value) => value && onChange(value?.toISOString())}
          style={[
            styles.datePicker,
            {
              opacity: value ? 1 : 0.5,
            },
          ]}
        />
      </FieldContainer>
    );
  },
);

const styles = StyleSheet.create({
  datePicker: {
    position: "absolute",
    left: -5,
    transform: [{ scale: 0.9 }],
  },
});

DatePickerField.displayName = "DatePickerField";
