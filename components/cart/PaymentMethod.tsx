import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const PaymentMethod = () => {
  const { t } = useTranslation();
  return (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-text-muted dark:text-text-muted-dark mb-2 text-left rtl:text-right">
        {t("cart.paymentMethod", "Payment Method")}
      </Text>
      <TouchableOpacity className="flex-row items-center justify-between bg-background dark:bg-background-dark p-3 rounded-xl border border-primary active:opacity-80 shadow-md">
        <View className="flex-row items-center">
          <View className="bg-card dark:bg-card-dark p-2 rounded-lg shadow-sm border border-border dark:border-border-dark mr-3 rtl:mr-0 rtl:ml-3">
            <Ionicons name="card-outline" size={24} className="text-primary" />
          </View>
          <View>
            <Text className="font-bold text-text dark:text-text-dark text-left rtl:text-right">
              Apple Pay
            </Text>
            <Text className="text-text-muted dark:text-text-muted-dark text-xs mt-0.5 text-left rtl:text-right">
              **** 4242
            </Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          className="text-primary rtl:rotate-180"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethod;
