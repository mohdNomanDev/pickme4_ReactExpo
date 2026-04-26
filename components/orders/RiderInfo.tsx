import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { Rider } from "../../store/ordersSlice";

interface Props {
  rider: Rider;
}

const RiderInfo = ({ rider }: Props) => {
  return (
    <View className="flex-row items-center p-3 rounded-xl mb-4 border bg-gray-50 border-gray-100 dark:bg-gray-700/50 dark:border-gray-600">
      <View className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center overflow-hidden mr-3">
        <Ionicons name="person" size={20} color="#666" />
      </View>

      <View className="flex-1">
        <Text className="font-semibold text-base text-gray-900 dark:text-white">
          {rider.name}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text className="text-xs ml-1 text-gray-600 dark:text-gray-300">
            {rider.rating} • {rider.vehicle === "bike" ? "Bicycle" : "Car"} (
            {rider.plateNumber})
          </Text>
        </View>
      </View>

      <View className="h-8 w-8 rounded-full bg-orange-100 items-center justify-center">
        <Ionicons name="call" size={16} color="#EA580C" />
      </View>
    </View>
  );
};

export default RiderInfo;
