export const hexToRgba = (hexColor: string, opacity: number): string => {
  // '#' işaretini kaldırıyoruz
  hexColor = hexColor.replace("#", "");

  // Renk bileşenlerini alıyoruz
  const bigint = parseInt(hexColor, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Opaklık değerini 0 ile 1 arasında bir değere dönüştürüyoruz
  const alpha = opacity / 100;

  // RGBA formatında döndürüyoruz
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
