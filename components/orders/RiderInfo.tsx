import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useColorScheme } from "nativewind";
import { Text, View } from "react-native";
import { Rider } from "../../store/ordersSlice";

interface Props {
  rider: Rider;
}

const RiderInfo = ({ rider }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={`flex-row items-center p-3 rounded-xl mb-4 border ${
        isDark ? "bg-gray-700/50 border-gray-600" : "bg-gray-50 border-gray-100"
      }`}
    >
      <View className="h-10 w-10 bg-gray-300 rounded-full items-center justify-center overflow-hidden mr-3">
        <Ionicons name="person" size={20} color="#666" />
      </View>

      <View className="flex-1">
        <Text
          className={`font-semibold text-base ${isDark ? "text-white" : "text-gray-900"}`}
        >
          {rider.name}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text
            className={`text-xs ml-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}
          >
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
