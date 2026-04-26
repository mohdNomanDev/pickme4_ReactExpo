import React from "react";
import { Text, View } from "react-native";
import { ActiveOrder } from "../../store/ordersSlice";
import OrderActions from "./OrderActions";
import OrderProgressBar from "./OrderProgressBar";
import RiderInfo from "./RiderInfo";

interface Props {
  order: ActiveOrder;
}

const OrderCard = ({ order }: Props) => {
  return (
    <View className="w-full md:w-1/2 lg:w-1/3 p-2">
      <View className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">
              {order.restaurantName}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {order.itemsCount} items • Order #{order.orderId.split("_")[1]}
              </Text>
            </View>
          </View>
          <View
            className={`px-3 py-1.5 rounded-full ${
              order.status === "preparing"
                ? "bg-orange-100 dark:bg-orange-900/30"
                : "bg-blue-100 dark:bg-blue-900/30"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                order.status === "preparing"
                  ? "text-orange-600 dark:text-orange-300"
                  : "text-blue-600 dark:text-blue-300"
              }`}
            >
              {order.statusLabel}
            </Text>
          </View>
        </View>

        <OrderProgressBar order={order} />

        {order.rider && <RiderInfo rider={order.rider} />}

        <OrderActions order={order} />
      </View>
    </View>
  );
};

export default OrderCard;
