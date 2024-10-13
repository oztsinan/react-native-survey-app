import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const useTypedNavigation = <T extends {}>() => {
  return useNavigation<NativeStackNavigationProp<T>>();
};
