import React from "react";
import { Text, View } from "react-native";

import ThemeToggle from "@/components/common/ThemeToggle";

const OrdersHeader = () => {
  return (
    <View className="flex-row items-center justify-between gap-3 py-4">
      <Text className="text-2xl font-bold text-gray-900 dark:text-white">
        My Orders
      </Text>
      <ThemeToggle compact />
    </View>
  );
};

export default OrdersHeader;
