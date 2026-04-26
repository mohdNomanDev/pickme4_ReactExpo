import React from "react";
import { useColorScheme } from "nativewind";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ActiveOrder } from "../../store/ordersSlice";

interface Props {
  order: ActiveOrder;
}

const OrderProgressBar = ({ order }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const progressPercent = `${Math.min(Math.max(order.progress * 100, 0), 100)}%`;

  return (
    <View className="my-4">
      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons
            name="time-outline"
            size={16}
            color={isDark ? "#9CA3AF" : "#6B7280"}
          />
          <Text className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Estimated Delivery
          </Text>
        </View>
        <Text className="text-sm font-bold text-gray-900 dark:text-white">
          {order.estimatedDeliveryTime}
        </Text>
      </View>

      <View className="h-2 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <View
          className="h-full bg-orange-500 rounded-full"
          style={{ width: progressPercent as any }}
        />
      </View>

      <Text className="text-xs mt-2 text-right text-gray-500 dark:text-gray-400">
        {order.remainingTime} mins remaining
      </Text>
    </View>
  );
};

export default OrderProgressBar;
