import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = ["$", "$$", "$$$", "$$$$"];

const PriceRangeSection = ({ value, onChange }: any) => {
  const { isRTL } = useSelector((state: RootState) => state.language);

  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        {isRTL ? "نطاق السعر" : "Price Range"}
      </Text>

      <View className={`flex-row flex-wrap gap-3 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        {OPTIONS.map((item) => {
          const isSelected = value === item;
          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              className={`py-3 px-6 rounded-2xl border ${
                isSelected 
                  ? "bg-primary border-primary" 
                  : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
              }`}
            >
              <Text className={`text-base font-bold text-center ${
                isSelected ? "text-white" : "text-gray-700 dark:text-gray-300"
              }`}>
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default PriceRangeSection;