import { useTheme } from "@/hook/useTheme";
import { Switch, View } from "react-native";
import { ThemedText } from "../Themed/ThemedText";

type SwitchFieldProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  text: string;
};

export const SwitchField = (props: SwitchFieldProps) => {
  const { value, onChange, text } = props;
  const { colors } = useTheme();

  return (
    <View className="w-full flex-row items-center gap-2">
      <Switch
        trackColor={{ false: "#B1B0FF", true: colors.primary }}
        ios_backgroundColor="#B1B0FF"
        onValueChange={onChange}
        value={value}
        style={{
          transform: [
            {
              scale: 0.7,
            },
          ],
        }}
      />

      <ThemedText className="flex-1 font-semibold text-sm">{text}</ThemedText>
    </View>
  );
};
