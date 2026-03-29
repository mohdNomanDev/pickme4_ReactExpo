import React from "react";
import { View, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = [
  { label: "Vegetarian", labelAr: "نباتي", value: "Vegetarian" },
  { label: "Vegan", labelAr: "خضري", value: "Vegan" },
  { label: "Gluten-Free", labelAr: "خالي من الغلوتين", value: "Gluten-Free" },
  { label: "Halal", labelAr: "حلال", value: "Halal" },
];

const DietarySection = ({ value = [], onChange }: any) => {
  
  const toggleItem = (itemValue: string) => {
    if (value.includes(itemValue)) {
      onChange(value.filter((v: string) => v !== itemValue));
    } else {
      onChange([...value, itemValue]);
    }
  };

  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 text-start`}>
        {'Dietary'}
      </Text>

      <View className={`flex-row flex-wrap gap-3 justify-start`}>
        {OPTIONS.map((item) => {
          const isSelected = value.includes(item.value);
          return (
            <Pressable
              key={item.value}
              onPress={() => toggleItem(item.value)}
              className={`py-2 px-5 rounded-full border ${
                isSelected 
                  ? "bg-gray-900 border-gray-900 dark:bg-white dark:border-white" 
                  : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
              }`}
            >
              <Text className={`text-sm font-medium ${
                isSelected 
                  ? "text-white dark:text-gray-900" 
                  : "text-gray-700 dark:text-gray-300"
              }`}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default DietarySection;