import React from "react";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import { ActiveOrder } from "../../store/ordersSlice";
import OrderActions from "./OrderActions";
import OrderProgressBar from "./OrderProgressBar";
import RiderInfo from "./RiderInfo";

interface Props {
  order: ActiveOrder;
}

const OrderCard = ({ order }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="w-full md:w-1/2 lg:w-1/3 p-2">
      <View
        className={`rounded-2xl p-5 shadow-sm border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
        }`}
      >
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <Text
              className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}
            >
              {order.restaurantName}
            </Text>
            <View className="flex-row items-center mt-1">
              <Text
                className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
              >
                {order.itemsCount} items • Order #{order.orderId.split("_")[1]}
              </Text>
            </View>
          </View>
          <View
            className={`px-3 py-1.5 rounded-full ${
              order.status === "preparing" ? "bg-orange-100" : "bg-blue-100"
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                order.status === "preparing"
                  ? "text-orange-600"
                  : "text-blue-600"
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
