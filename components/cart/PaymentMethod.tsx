import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const { t } = useTranslation();
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">
        {t("cart.paymentMethod", "Payment Method")}
      </Text>
      <TouchableOpacity className="flex-row items-center justify-between bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-800">
        <View className="flex-row items-center">
          <View className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 mr-3">
            <Ionicons name="card-outline" size={24} className="text-blue-500" />
          </View>
          <View>
            <Text className="font-bold text-gray-900 dark:text-white">Apple Pay</Text>
            <Text className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">**** 4242</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} className="text-gray-400" />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;
