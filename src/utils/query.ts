import i18next from "i18next";
import Toast from "./toast";

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

  Toast.error({
    title: i18next.t("error"),
    message: errorMessage,
  });
};
