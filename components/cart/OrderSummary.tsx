import { calculateCartTotals } from "@/utils/cartCalculations";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import PaymentMethod from "./PaymentMethod";
import PlaceOrderButton from "./PlaceOrderButton";

const OrderSummary = () => {
    const cart = useSelector((state: any) => state.cart.cart);

  const { subtotal, deliveryFee, vat, total } = calculateCartTotals(cart);

  return (
    <View className="bg-transparent">
      <PaymentMethod />

      <View className="mb-2">
        <View className="flex-row justify-between items-center py-1.5">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm text-left ">
            {"Subtotal"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right "
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {"SAR"} {subtotal.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center py-1.5">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm text-left ">
            {"Delivery Fee"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right "
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {deliveryFee === 0
              ? "FREE"
              : `${"SAR"} ${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View className="flex-row justify-between items-center py-1.5">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm text-left ">
            {"VAT (15%)"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right "
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {"SAR"} {vat.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between items-center py-2 mt-3 pt-4 border-t border-border dark:border-border-dark">
          <Text className="font-bold text-text dark:text-text-dark text-lg text-left ">
            {"Total"}
          </Text>
          <Text
            className="font-bold text-primary text-xl text-right "
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {"SAR"} {total.toFixed(2)}
          </Text>
        </View>
      </View>

      <PlaceOrderButton total={total} />
    </View>
  );
};

export default OrderSummary;
