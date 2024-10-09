import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParams } from "./RootStackParams";
import { AuthStackGroup } from "./AuthStackGroup";
import { Routes } from "./Routes";
import BottomTab from "./BottomTab";

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();

  useEffect(() => {
    async function prepare() {
      try {
        // preload methodlar burada çağırılıyor
      } catch (e) {
        console.warn(e);
      } finally {
        // Auth durumu kontrol edildiğinde splash screen kaldırılacak
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Routes.BOTTOM_TAB} component={BottomTab} />
      {AuthStackGroup()}
    </Stack.Navigator>
  );
};

export default RootStack;
