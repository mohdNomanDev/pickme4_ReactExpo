import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const PromoCode = () => {
  const { t } = useTranslation();
  
  return (
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 h-12">
          <Ionicons name="pricetag-outline" size={20} className="text-gray-400 mr-2" />
          <TextInput 
            placeholder={t("cart.promoPlaceholder", "Enter Promo Code")}
            placeholderTextColor="#9ca3af"
            className="flex-1 text-gray-900 dark:text-white font-medium"
          />
        </View>
        <TouchableOpacity className="bg-gray-900 dark:bg-white ml-3 px-5 h-12 justify-center rounded-xl active:opacity-70">
          <Text className="text-white dark:text-gray-900 font-bold">
            {t("cart.apply", "Apply")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCode;
