import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = [
  { label: "Recommended", labelAr: "موصى به", value: "recommended" },
  { label: "Rating", labelAr: "التقييم", value: "rating" },
  { label: "Delivery Time", labelAr: "وقت التوصيل", value: "delivery_time" },
  { label: "Price: Low to High", labelAr: "السعر: من الأقل للأعلى", value: "price_low_high" },
];

const SortBySection = ({ value, onChange }: any) => {
  const { isRTL } = useSelector((state: RootState) => state.language);

  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 text-start`}>
        {isRTL ? "ترتيب حسب" : "Sort By"}
      </Text>

      <View className="space-y-2">
        {OPTIONS.map((item) => {
          const isSelected = value === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => onChange(item.value)}
              className={`flex-row items-center py-3 px-4 rounded-xl border ${
                isSelected 
                  ? "bg-primary/10 border-primary dark:bg-primary/20" 
                  : "bg-gray-50 border-transparent dark:bg-gray-800 dark:border-gray-700"
              }`}
            >
              <Text className={`flex-1 text-base font-medium ${
                isSelected ? "text-primary" : "text-gray-700 dark:text-gray-300"
              } text-start ps-3`}>                {isRTL ? item.labelAr : item.label}
              </Text>
              
              {/* Radio Indicator */}
              <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${
                isSelected ? "border-primary" : "border-gray-300 dark:border-gray-600"
              }`}>
                {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default SortBySection;