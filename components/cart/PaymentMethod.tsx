import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const { t } = useTranslation();
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-400 mb-2 text-left rtl:text-right">
        {t("cart.paymentMethod", "Payment Method")}
      </Text>
      <TouchableOpacity className="flex-row rtl:flex-row-reverse items-center justify-between bg-[#1A110A] p-3 rounded-xl border border-orange-500 active:opacity-80 shadow-md">
        <View className="flex-row rtl:flex-row-reverse items-center">
          <View className="bg-[#2C1F14] p-2 rounded-lg shadow-sm border border-[#3A2A1D] mr-3 rtl:mr-0 rtl:ml-3">
            <Ionicons name="card-outline" size={24} className="text-orange-500" />
          </View>
          <View>
            <Text className="font-bold text-white text-left rtl:text-right">Apple Pay</Text>
            <Text className="text-gray-400 text-xs mt-0.5 text-left rtl:text-right">**** 4242</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} className="text-orange-500 rtl:rotate-180" />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;
