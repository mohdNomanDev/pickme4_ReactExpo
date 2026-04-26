import React from "react";
import { View, Text } from "react-native";
import OrderCard from "./OrderCard";
import { ActiveOrder } from "../../store/ordersSlice";

interface Props {
  orders: ActiveOrder[];
}

const ActiveOrdersSection = ({ orders = [] }: Props) => {
  if (orders.length === 0) {
    return (
      <View className="py-20 items-center justify-center w-full">
        <Text className="text-lg font-medium text-gray-500 dark:text-gray-400">
          No active orders right now
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap w-full mt-4">
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </View>
  );
};

export default ActiveOrdersSection;
