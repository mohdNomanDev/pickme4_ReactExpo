import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { OrderHistory } from "../../store/ordersSlice";

interface Props {
  order: OrderHistory;
}

const OrderHistoryItem = ({ order }: Props) => {
  const isDelivered = order.status === "delivered";
  const statusColor = isDelivered
    ? "text-green-600 dark:text-green-400"
    : "text-red-600 dark:text-red-400";
  const statusBg = isDelivered
    ? "bg-green-100 dark:bg-green-900/30"
    : "bg-red-100 dark:bg-red-900/30";
  const statusIcon = isDelivered ? "checkmark-circle" : "close-circle";

  // Format date
  const dateStr = order.deliveredAt || order.cancelledAt || "";
  const date = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <View className="w-full md:w-1/2 lg:w-1/3 p-2">
      <View className="rounded-2xl p-4 border bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {order.restaurantName}
            </Text>
            <Text className="text-sm mt-1 text-gray-500 dark:text-gray-400">
              {formattedDate} • {order.itemsCount} items
            </Text>
          </View>

          <Text className="font-bold text-lg text-gray-900 dark:text-white">
            {order.totalAmount} {order.currency}
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <View
            className={`flex-row items-center px-2 py-1 rounded-md ${statusBg}`}
          >
            <Ionicons
              name={statusIcon}
              size={14}
              color={isDelivered ? "#16A34A" : "#DC2626"}
            />
            <Text className={`text-xs font-semibold ml-1 ${statusColor}`}>
              {order.statusLabel}
            </Text>
          </View>

          {order.actions.canReorder && (
            <View className="bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Pressable
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Ionicons name="refresh" size={16} color="#EA580C" />
                <Text className="text-orange-600 font-semibold ml-1 text-sm">
                  Reorder
                </Text>
              </Pressable>
            </View>
          )}

          {order.actions.canRetry && (
            <View className="bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <Pressable
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  opacity: pressed ? 0.7 : 1,
                })}
              >
                <Ionicons name="refresh" size={16} color="#EA580C" />
                <Text className="text-orange-600 font-semibold ml-1 text-sm">
                  Retry
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderHistoryItem;
