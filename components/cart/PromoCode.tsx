import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const PromoCode = () => {
  const { t } = useTranslation();
  
  return (
    <View className="bg-[#2C1F14] rounded-2xl p-4 shadow-md border border-[#3A2A1D] mb-4">
      <View className="flex-row rtl:flex-row-reverse items-center">
        <View className="flex-1 flex-row rtl:flex-row-reverse items-center bg-[#1A110A] border border-[#3A2A1D] rounded-xl px-3 h-12">
          <Ionicons name="pricetag-outline" size={20} className="text-gray-400 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-90" />
          <TextInput 
            placeholder={t("cart.promoPlaceholder", "Enter Promo Code")}
            placeholderTextColor="#9ca3af"
            className="flex-1 text-white font-medium text-left rtl:text-right"
          />
        </View>
        <TouchableOpacity className="bg-[#3A2A1D] ml-3 rtl:ml-0 rtl:mr-3 px-5 h-12 justify-center rounded-xl active:opacity-80 border border-[#4A3A2D]">
          <Text className="text-white font-bold">
            {t("cart.apply", "Apply")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCode;
