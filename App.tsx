import { ThemeProvider } from "./src/providers/ThemeProvider";
import RootStack from "./src/navigations/RootStack";

//nativewind v4 versiyonunda gerekli olan global css dosyası
import "./src/assets/global.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { NotifierWrapper } from "react-native-notifier";

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NotifierWrapper>
          <RootStack />
        </NotifierWrapper>
      </ThemeProvider>
    </QueryProvider>
  );
}
