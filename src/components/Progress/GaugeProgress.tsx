import { useTheme } from "@/hook/useTheme";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Line, G } from "react-native-svg";
import { ThemedText } from "../Themed/ThemedText";
import { hexToRgba } from "@/utils/color";

interface GaugeProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // 0-100 arası bir yüzde değeri
  ticks?: number; // Kaç tane çentik olsun
  label?: string;
}

export const GaugeProgress = ({ size, strokeWidth, progress, ticks = 7, label }: GaugeProgressProps) => {
  const { colors } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius * 1.5; // 240 derece yay için çarpan 1.5
  const progressNormalized = progress / 100;
  const strokeDashoffset = circumference * (1 - progressNormalized);

  // Çentiklerin açısını hesapla (sol taraftan başlaması için -120 derece ile başlatıyoruz)
  const tickSpacing = 240 / (ticks - 1); // Yarı daire yerine 240 derece kullanıyoruz

  // Çentikleri oluştur
  const renderTicks = () => {
    const lines = [];
    for (let i = 0; i < ticks; i++) {
      const angle = -170 + tickSpacing * i; // -120 derece ile başla, daha geniş açı
      const x1 = size / 2 + radius * Math.cos((angle * Math.PI) / 180);
      const y1 = size / 2 + radius * Math.sin((angle * Math.PI) / 180);
      const x2 = size / 2 + (radius - strokeWidth) * Math.cos((angle * Math.PI) / 180);
      const y2 = size / 2 + (radius - strokeWidth) * Math.sin((angle * Math.PI) / 180);

      lines.push(<Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={hexToRgba(colors?.primary, 20)} strokeWidth="2" strokeLinecap="round" />);
    }
    return lines;
  };

  return (
    <View className="relative">
      <Svg width={size} height={size / 1.5} viewBox={`0 0 ${size} ${size / 1.5}`}>
        {/* Çentikleri Çiz */}
        <G strokeLinecap="round">{renderTicks()}</G>
        <G rotation="120" origin={`${size / 2}, ${size / 2}`}>
          {/* Arka Plan Yarı Daire */}
          <Circle
            stroke="rgba(255, 255, 255, 0.2)"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={0}
            strokeLinecap="round"
          />
          {/* İlerleme Çubuğu */}
          <Circle
            stroke="white" // İlerleme çubuğunun rengi
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" // Burada da uçları yuvarlat
          />
        </G>
      </Svg>

      <View className="w-full items-center absolute bottom-0">
        <ThemedText className="text-white text-sm">{label}</ThemedText>
        <View
          className="w-[2px] h-5 bg-white rounded-full -mb-[4px]"
          style={{
            transform: [
              {
                rotate: `${-90 + (progress * 180) / 100}deg`,
              },
            ],
          }}
        />
        <View className="flex-1 justify-center items-center bg-blue-900">
          {/* en büyük dış daire */}
          <View className="size-[15px] bg-white rounded-full absolute" />
          {/* orta daire */}
          <View className="size-[10px] bg-blue-900 rounded-full absolute" />
          {/* en küçük iç daire */}
          <View className="size-[5px] bg-white rounded-full absolute" />
        </View>
      </View>
    </View>
  );
};
