import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const OPTIONS = ["4.5+", "4.0+", "3.5+"];

const RatingSection = ({ value, onChange }: any) => {
  
  return (
    <View className="mb-6">
      <Text className={`text-lg font-bold text-gray-900 dark:text-white mb-3 text-start`}>
        {'Ratings'}
      </Text>

      <View className={`flex-row flex-wrap gap-3 justify-start`}>
        {OPTIONS.map((item) => {
          const isSelected = value === item;
          return (
            <Pressable
              key={item}
              onPress={() => onChange(item)}
              className={`flex-row items-center py-2.5 px-4 rounded-full border ${
                isSelected 
                  ? "bg-primary/10 border-primary dark:bg-primary/20" 
                  : "bg-white border-gray-200 dark:bg-card-dark dark:border-gray-700"
              }`}
            >
              <Ionicons 
                name="star" 
                size={18} 
                color={isSelected ? "#f27f0d" : "#fbbf24"} 
              />
              <Text className={`font-bold text-sm mx-2 ${
                isSelected ? "text-primary" : "text-gray-700 dark:text-gray-300"
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

export default RatingSection;