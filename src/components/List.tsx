import { View } from "react-native";
import { ThemedText } from "./ThemedText";

export const List = ({
  children,
  title,
  renderTitle,
}: {
  children: React.ReactNode;
  title?: string;
  renderTitle?: () => React.ReactNode;
}) => {
  const renderTitleContent = () => {
    if (title) {
      return <ThemedText className="text-gray-400 text-sm">{title}</ThemedText>;
    }
    if (renderTitle) {
      return renderTitle();
    }
  };

  return (
    <View className="w-full grid gap-2">
      {renderTitleContent()}
      <View className="grid gap-2">{children}</View>
    </View>
  );
};
