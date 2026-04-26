import React from "react";
import { Text, View } from "react-native";
import { OrderHistory } from "../../store/ordersSlice";
import OrderHistoryItem from "./OrderHistoryItem";

interface Props {
  orders: OrderHistory[];
}

const OrderHistorySection = ({ orders = [] }: Props) => {
  if (orders.length === 0) {
    return (
      <View className="py-20 items-center justify-center w-full">
        <Text className="text-lg font-medium text-gray-500 dark:text-gray-400">
          You havent placed any orders yet
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap w-full mt-4">
      {orders.map((order) => (
        <OrderHistoryItem key={order.orderId} order={order} />
      ))}
    </View>
  );
};

export default OrderHistorySection;
