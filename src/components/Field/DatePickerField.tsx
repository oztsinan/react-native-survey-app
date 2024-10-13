import { cn } from "@/utils/cn";
import { ClassValue } from "clsx";
import { FieldContainer } from "./FieldContainer";
import React, { forwardRef } from "react";
import { BaseDateTimePicker } from "../Base/BaseDateTimePicker";

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
          style={{
            position: "absolute",
            left: -5,
            transform: [{ scale: 0.9 }],
            opacity: value ? 1 : 0.5,
          }}
        />
      </FieldContainer>
    );
  },
);

DatePickerField.displayName = "DatePickerField";
