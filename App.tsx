import { ThemeProvider } from "./src/providers/ThemeProvider";
import RootStack from "./src/navigations/RootStack";

//nativewind v4 versiyonunda gerekli olan global css dosyası
import "./src/assets/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <RootStack />
    </ThemeProvider>
  );
}
