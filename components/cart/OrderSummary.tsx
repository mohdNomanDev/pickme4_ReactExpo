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
        <View className="flex-row justify-between mb-4">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm font-medium text-left ">
            {"Subtotal"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right tabular-nums"
          >
            {"SAR"} {subtotal.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm font-medium text-left ">
            {"Delivery Fee"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right tabular-nums"
          >
            {deliveryFee === 0
              ? "Free"
              : `SAR ${deliveryFee.toFixed(2)}`}
          </Text>
        </View>

        <View className="flex-row justify-between mb-4">
          <Text className="text-text-muted dark:text-text-muted-dark text-sm font-medium text-left ">
            {"VAT (15%)"}
          </Text>
          <Text
            className="text-text dark:text-text-dark text-sm font-semibold text-right tabular-nums"
          >
            {"SAR"} {vat.toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between mt-2 pt-4 border-t border-border dark:border-border-dark">
          <Text className="font-bold text-text dark:text-text-dark text-xl text-left ">
            {"Total"}
          </Text>
          <Text
            className="font-bold text-primary text-xl text-right tabular-nums"
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
