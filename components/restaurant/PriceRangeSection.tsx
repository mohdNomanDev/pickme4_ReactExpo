import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = [
  { id: "10-30", range: "10-30" },
  { id: "30-60", range: "30-60" },
  { id: "60-100", range: "60-100" },
  { id: "100+", range: "100+" }
];

const PriceRangeSection = ({ value, onChange }: any) => {
  const { isRTL, currentLanguage } = useSelector((state: RootState) => state.language);
  
  // Localized currency
  const currencyStr = currentLanguage === 'ar' ? 'ر.س' : 'SAR';

  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-start">
        {isRTL ? "نطاق السعر" : "Price Range"}
      </Text>

      <View className="flex-row flex-wrap gap-3 justify-start">
        {OPTIONS.map((item) => {
          const isSelected = value === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onChange(item.id)}
              className={`py-2 px-4 rounded-full border items-center justify-center ${
                isSelected 
                  ? "bg-primary border-primary" 
                  : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
              }`}
            >
              <Text className={`text-sm font-bold text-center ${
                isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
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