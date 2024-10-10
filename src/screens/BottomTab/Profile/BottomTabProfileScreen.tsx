import { List } from "@/components/List";
import { ListItem } from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { ScrollView } from "react-native";
import { BottomTabProfileEditListItem } from "./components/BottomTabProfileEditListItem";
import { ScreenHeader } from "@/components/ScreenHeader";

export const BottomTabProfileScreen = () => {
  return (
    <ScrollView
      contentContainerClassName="p-page gap-page"
      contentInsetAdjustmentBehavior="automatic"
    >
      <ScreenHeader title="Profil" icon="account" />
      <List title="Hesap Bilgileri">
        <BottomTabProfileEditListItem title="Nickname" value="TEST" />
        <BottomTabProfileEditListItem title="E-mail" value="test@test.com" />
        <BottomTabProfileEditListItem title="Doğum Tarihi" value="01.01.2000" />
        <BottomTabProfileEditListItem title="Cinsiyet" value="Erkek" />
      </List>

      <List title="Hakkımızda">
        <ListItem onPress={() => {}}>
          <ThemedText className="text-primary text-sm">
            Gizlilik Politikası
          </ThemedText>
        </ListItem>

        <ListItem onPress={() => {}}>
          <ThemedText className="text-primary text-sm">
            Şartlar ve Koşullar
          </ThemedText>
        </ListItem>
      </List>
    </ScrollView>
  );
};
