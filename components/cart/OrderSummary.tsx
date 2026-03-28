import { calculateCartTotals } from "@/utils/cartCalculations";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import PaymentMethod from "./PaymentMethod";
import PlaceOrderButton from "./PlaceOrderButton";
import { useTranslation } from "react-i18next";

const OrderSummary = () => {
  const { t } = useTranslation();
  const cart = useSelector((state: any) => state.cart.cart);

  const { subtotal, deliveryFee, vat, total } = calculateCartTotals(cart);

  return (
    <View className="bg-transparent">
      <PaymentMethod />
      
      <View className="mb-4">
        <View className="flex-row justify-between items-center py-1">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("cart.subtotal", "Subtotal")}</Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm font-semibold" style={{ fontVariant: ['tabular-nums'] }}>{t("currency", "SAR")} {subtotal.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center py-1">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("cart.deliveryFee", "Delivery Fee")}</Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm font-semibold" style={{ fontVariant: ['tabular-nums'] }}>
            {deliveryFee === 0 ? t("cart.free", "FREE") : `${t("currency", "SAR")} ${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View className="flex-row justify-between items-center py-1">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">{t("cart.vat", "VAT (15%)")}</Text>
          <Text className="text-gray-700 dark:text-gray-300 text-sm font-semibold" style={{ fontVariant: ['tabular-nums'] }}>{t("currency", "SAR")} {vat.toFixed(2)}</Text>
        </View>

        <View className="flex-row justify-between items-center py-1 mt-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <Text className="font-bold text-gray-900 dark:text-white text-lg">{t("cart.total", "Total")}</Text>
          <Text className="font-bold text-gray-900 dark:text-white text-xl" style={{ fontVariant: ['tabular-nums'] }}>{t("currency", "SAR")} {total.toFixed(2)}</Text>
        </View>
      </View>

      <PlaceOrderButton total={total} />
    </View>
  );
};

export default OrderSummary;
