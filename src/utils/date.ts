import { formatDate } from "date-fns";
import { tr } from "date-fns/locale";

export const baseFormatDate = (
  dateValue?: string | Date,
  format: string = "dd/MM/yyyy HH:mm"
) => {
  if (!dateValue) return "";

  let date = new Date();

  if (typeof dateValue === "string") {
    if (dateValue.includes("Z")) {
      date = new Date(dateValue);
    } else if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // eğer tarih YYYY-MM-DD formatındaysa, bu parçaları kullanarak UTC bir tarih oluştur
      const [year, month, day] = dateValue.split("-").map(Number);
      date = new Date(Date.UTC(year!, month! - 1, day));
    } else {
      date = new Date(`${dateValue}Z`);
    }
  } else if (dateValue instanceof Date) {
    // Eğer dateValue zaten bir Date nesnesi ise, onu doğrudan kullan
    date = dateValue;
  }

  const formattedDate = formatDate(date, format, {
    locale: tr,
  });

  return formattedDate;
};
