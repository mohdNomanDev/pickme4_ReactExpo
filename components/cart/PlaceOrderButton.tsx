import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const PlaceOrderButton = ({ total }: { total: number }) => {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity className="bg-orange-500 active:bg-orange-600 rounded-2xl py-4 px-6 flex-row justify-between items-center shadow-md" style={{ boxShadow: "0 4px 6px -1px rgba(249, 115, 22, 0.3)" }}>
      <Text className="text-white font-bold text-lg">
        {t("cart.placeOrder", "Place Order")}
      </Text>
      <View className="bg-white/20 px-3 py-1 rounded-full">
        <Text className="text-white font-bold" style={{ fontVariant: ['tabular-nums'] }}>
          {t("currency", "SAR")} {total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceOrderButton;
