import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParams } from "./RootStackParams";
import { AuthStackGroup } from "./AuthStackGroup";
import { Routes } from "./Routes";
import BottomTab from "./BottomTab";
import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
  useFonts,
} from "@expo-google-fonts/comfortaa";

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();
  const [loaded, error] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_500Medium,
    Comfortaa_600SemiBold,
    Comfortaa_700Bold,
  });

  //   useEffect(() => {
  //     async function prepare() {
  //       try {
  //         // preload methodlar burada çağırılıyor
  //       } catch (e) {
  //         console.warn(e);
  //       } finally {
  //         // Auth durumu kontrol edildiğinde splash screen kaldırılacak
  //         await SplashScreen.hideAsync();
  //       }
  //     }

  //     prepare();
  //   }, [loaded]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
