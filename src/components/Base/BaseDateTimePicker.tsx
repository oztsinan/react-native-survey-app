import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { ThemedText } from "../Themed/ThemedText";
import { deviceLanguage, isAndroid } from "@/utils/device";
import { baseFormatDate } from "@/utils/date";

type BaseDateTimePickerProps = {
  value: Date;
  mode?: "countdown" | "time" | "date" | "datetime";
  display?: "default" | "spinner" | "calendar" | "clock" | "compact" | "inline";
  onChange: (event: any, value: Date | undefined) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  style?: any;
};

export const BaseDateTimePicker = ({ value, mode, display = "compact", onChange, maximumDate, minimumDate, style }: BaseDateTimePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (isAndroid) {
    return (
      <View>
        <TouchableOpacity className="bg-systemBackground rounded p-2.5" onPress={() => setIsOpen(!isOpen)}>
          <ThemedText>{value ? baseFormatDate(value, "dd MMMM yyyy") : "Tarih Seçiniz"}</ThemedText>
        </TouchableOpacity>
        {isOpen && (
          <DateTimePicker
            value={value}
            mode={mode}
            display={display as any}
            onChange={(e, v) => {
              onChange(e, v);
              setIsOpen(false);
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            onTouchCancel={() => setIsOpen(false)}
            onPointerCancel={() => setIsOpen(false)}
            style={style}
            locale={deviceLanguage}
          />
        )}
      </View>
    );
  }

  return (
    <DateTimePicker
      value={value}
      mode={mode}
      display={display as any}
      onChange={onChange}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      style={style}
      locale={deviceLanguage}
    />
  );
};
