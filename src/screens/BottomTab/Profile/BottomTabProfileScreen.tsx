import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { Alert, ScrollView } from "react-native";
import { BottomTabProfileEditListItem } from "./components/BottomTabProfileEditListItem";
import { ScreenHeader } from "@/components/Header/ScreenHeader";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore } from "@/store/AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";
import { useTheme } from "@/hook/useTheme";

export const BottomTabProfileScreen = () => {
  const { colors } = useTheme();
  const { user, setUser } = useAuthStore();

  const onLogoutPress = async () => {
    Alert.alert("Çıkış Yap", "Çıkış yapmak istediğinize emin misiniz?", [
      {
        text: "Hayır",
        style: "cancel",
      },
      {
        text: "Evet",
        onPress: async () => {
          await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
          await AsyncStorage.removeItem(StorageKeys.REFRESH_TOKEN);
          setUser(undefined);
        },
        style: "destructive",
      },
    ]);
  };

  const onPrivacyPolicyPress = async () => {
    await WebBrowser.openBrowserAsync(
      "https://eworldfulfillment.com/wp-content/uploads/2021/01/Privacy-Policy-Example-Template.pdf",
      {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      }
    );
  };

  const onTermsAndConditionsPress = async () => {
    await WebBrowser.openBrowserAsync(
      "https://www.termsfeed.com/public/uploads/2021/12/sample-terms-conditions-agreement.pdf",
      {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      }
    );
  };

  return (
    <ScrollView
      contentContainerClassName="p-page gap-page"
      contentInsetAdjustmentBehavior="automatic"
    >
      <ScreenHeader title="Profil" icon="account" />
      <List title="Hesap Bilgileri">
        <BottomTabProfileEditListItem
          title="İsim"
          value={user?.name}
          dtoKey="name"
        />
        <BottomTabProfileEditListItem
          title="E-mail"
          value={user?.email}
          dtoKey="email"
        />

        <ListItem onPress={onLogoutPress}>
          <ThemedText
            style={{ color: colors?.destructive }}
            className="text-sm"
          >
            Çıkış Yap
          </ThemedText>
        </ListItem>
      </List>

      <List title="Hakkımızda">
        <ListItem onPress={onPrivacyPolicyPress}>
          <ThemedText className="text-primary text-sm">
            Gizlilik Politikası
          </ThemedText>
        </ListItem>

        <ListItem onPress={onTermsAndConditionsPress}>
          <ThemedText className="text-primary text-sm">
            Şartlar ve Koşullar
          </ThemedText>
        </ListItem>
      </List>
    </ScrollView>
  );
};
