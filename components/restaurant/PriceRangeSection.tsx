import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = [
  { symbol: "$", range: "10-30" },
  { symbol: "$$", range: "30-60" },
  { symbol: "$$$", range: "60-100" },
  { symbol: "$$$$", range: "100+" }
];

const PriceRangeSection = ({ value, onChange }: any) => {
  const { isRTL, lang } = useSelector((state: RootState) => state.language);
  
  // Localized currency
  const currencyStr = lang === 'ar' ? 'ر.س' : 'SAR';

  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        {isRTL ? "نطاق السعر" : "Price Range"}
      </Text>

      <View className={`flex-row flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        {OPTIONS.map((item) => {
          const isSelected = value === item.symbol;
          return (
            <Pressable
              key={item.symbol}
              onPress={() => onChange(item.symbol)}
              className={`py-2 px-4 rounded-2xl border items-center justify-center min-w-[72px] ${
                isSelected 
                  ? "bg-primary border-primary" 
                  : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
              }`}
            >
              <Text className={`text-base font-bold text-center mb-0.5 ${
                isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}>
                {item.symbol}
              </Text>
              <Text className={`text-[10px] font-medium text-center ${
                isSelected ? "text-white/90" : "text-gray-500 dark:text-gray-400"
              }`}>
                {isRTL ? `${item.range} ${currencyStr}` : `${currencyStr} ${item.range}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default PriceRangeSection;