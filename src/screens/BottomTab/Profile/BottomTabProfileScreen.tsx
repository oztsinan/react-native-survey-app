import { List } from "@/components/List/List";
import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { ScrollView } from "react-native";
import { BottomTabProfileEditListItem } from "./components/BottomTabProfileEditListItem";
import { ScreenHeader } from "@/components/Header/ScreenHeader";
import { useTheme } from "@/hook/useTheme";
import { useTranslation } from "react-i18next";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useBottomTabProfileScreen } from "./useBottomTabProfileScreen";

export const BottomTabProfileScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation("ProfileModule");

  // eğer bir ekranda logic işlemleri yapacaksak useBottomTabProfileScreen gibi bir hook yapıp kod karmaşıklığını azaltmaya ve kod tekrarını önlemeye çalışıyorum.
  const { user, onLogoutPress, onPrivacyPolicyPress, onTermsAndConditionsPress, themeIndex, languageIndex, onChangeLanguage, onChangeTheme } =
    useBottomTabProfileScreen();

  return (
    <ScrollView contentContainerClassName="p-page gap-page" contentInsetAdjustmentBehavior="automatic">
      <ScreenHeader title={t("profile")} icon="account" />
      <List title={t("accountInformation")}>
        <BottomTabProfileEditListItem title={t("name")} value={user?.name} dtoKey="name" />
        <BottomTabProfileEditListItem title={t("email")} value={user?.email} dtoKey="email" />

        <ListItem onPress={onLogoutPress}>
          <ThemedText style={{ color: colors?.destructive }} className="text-sm">
            {t("logout")}
          </ThemedText>
        </ListItem>
      </List>

      <List title={t("aboutUs")}>
        <ListItem onPress={onPrivacyPolicyPress}>
          <ThemedText className="text-primary text-sm">{t("privacyPolicy")}</ThemedText>
        </ListItem>

        <ListItem onPress={onTermsAndConditionsPress}>
          <ThemedText className="text-primary text-sm">{t("termsAndConditions")}</ThemedText>
        </ListItem>
      </List>

      <List title={t("theme")}>
        <ListItem>
          <SegmentedControl
            values={[t("dark"), t("light"), t("system")]}
            selectedIndex={themeIndex}
            onChange={(event) => onChangeTheme(event.nativeEvent.selectedSegmentIndex)}
          />
        </ListItem>
      </List>

      <List title={t("language")}>
        <ListItem>
          <SegmentedControl
            values={[t("english"), t("turkish")]}
            selectedIndex={languageIndex}
            onChange={(event) => onChangeLanguage(event.nativeEvent.selectedSegmentIndex)}
          />
        </ListItem>
      </List>
    </ScrollView>
  );
};
