import i18next from "i18next";
import { Notifier, NotifierComponents } from "react-native-notifier";

export const onQueryError = (error: any) => {
  let errorMessage = "";

  // error tipine göre mesajı 
  if (typeof error === "string") {
    errorMessage = error; // hata mesajı string ise direkt al
  } else if (error instanceof Error) {
    errorMessage = error.message; // hata bir Error objesi ise message'ı al
  } else if (error?.response?.data?.message) {
    errorMessage = error.response.data.message; // API'den gelen response'daki hata mesajını al
  } else {
    errorMessage = "An unknown error occurred"; // diğer durumlarda varsayılan bir mesaj kullan
  }

  Notifier.showNotification({
    title: i18next.t("error"), // Başlık kısmına "Hata" kelimesini geçiyoruz
    description: errorMessage, // Hata mesajını buraya geçiriyoruz
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: "error",
    },
  });
};
