import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

const PlaceOrderButton = ({ total }: { total: number }) => {
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity 
      className="bg-orange-500 active:opacity-80 rounded-xl py-4 px-6 flex-row rtl:flex-row-reverse justify-between items-center shadow-lg w-full mt-4" 
      style={{ shadowColor: "#F97316", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 }}
    >
      <Text className="text-white font-bold text-lg text-left rtl:text-right">
        {t("cart.placeOrder", "Place Order")}
      </Text>
      <View className="bg-black/20 px-3 py-1.5 rounded-lg">
        <Text className="text-white font-bold text-right rtl:text-left" style={{ fontVariant: ['tabular-nums'] }}>
          {t("currency", "SAR")} {total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceOrderButton;
