import RootStack from "./src/navigations/RootStack";
import { ThemeProvider } from "./src/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider"; // query provider
import { NotifierWrapper } from "react-native-notifier"; // toast mesajları için kullanılan kütüphane
import { StatusBar } from "expo-status-bar"; // status bar
import "./src/assets/global.css"; //nativewind v4 versiyonunda gerekli olan global css dosyası
import "@/locales/i18n"; // i18n dosyasını import ediyoruz

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NotifierWrapper>
          <RootStack />
          <StatusBar style="auto" />
        </NotifierWrapper>
      </ThemeProvider>
    </QueryProvider>
  );
}
