import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { RootStackParams } from "./RootStackParams";
import { Routes } from "./Routes";
import BottomTab from "./BottomTab";
import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_500Medium,
  Comfortaa_600SemiBold,
  Comfortaa_700Bold,
} from "@expo-google-fonts/comfortaa";
import { loadAsync } from "expo-font";
import { SurveyScreen } from "@/screens/Survey/SurveyScreen";
import { AuthScreen } from "@/screens/Auth/AuthScreen";
import { useAuthStore } from "@/store/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";
import { queryClient } from "@/providers/QueryProvider";
import { getAuthMeQueryConfig } from "@/api/Auth";
import { SurveyResultScreen } from "@/screens/SurveyResult/SurveyResultScreen";

SplashScreen.preventAutoHideAsync();

const RootStack = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();
  const { user, setUser } = useAuthStore();

  const onFontLoad = async () => {
    await loadAsync({
      Comfortaa_300Light,
      Comfortaa_400Regular,
      Comfortaa_500Medium,
      Comfortaa_600SemiBold,
      Comfortaa_700Bold,
    });
  };

  const onAuthStateChanged = async () => {
    // auth durumunu kontrol et
    const accessToken = await AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN);

    if (accessToken) {
      const user = await queryClient.fetchQuery(getAuthMeQueryConfig);
      setUser(user);
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        // preload methodlar burada çağırılıyor
        await onFontLoad();
        await onAuthStateChanged();
      } catch (e) {
        console.warn(e);
      } finally {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
          // preload işlemi bittikten sonra splash screen kapatılıyor
        }, 700); // animasyon geçişi gözükmemesi için 700ms bekletildi
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
      {!user && <Stack.Screen name={Routes.AUTH} component={AuthScreen} />}
      {user && <Stack.Screen name={Routes.BOTTOM_TAB} component={BottomTab} />}
      <Stack.Screen name={Routes.SURVEY} component={SurveyScreen} />
      <Stack.Screen
        name={Routes.SURVEY_RESULT}
        component={SurveyResultScreen}
        options={({ route }) => ({
          title: "Anket Sonucu",
          headerShown: true,
          headerLargeTitle: true,
          presentation: "modal",
        })}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
