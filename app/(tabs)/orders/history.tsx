import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import OrderHistorySection from "../../../components/orders/OrderHistorySection";
import { RootState } from "../../../store/store";

export default function OrderHistoryScreen() {
  const { orderHistory } = useSelector((state: RootState) => state.orders);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-[100px]"
        contentInsetAdjustmentBehavior="automatic"
      >
        <OrderHistorySection orders={orderHistory} />
      </ScrollView>
    </View>
  );
}
