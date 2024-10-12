import { View } from "react-native";

export const FormItem = ({ children }: { children: React.ReactNode }) => {
  return <View className="w-full gap-2.5">{children}</View>;
};
