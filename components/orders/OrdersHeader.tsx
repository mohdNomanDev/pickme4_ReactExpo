import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, Pressable, View } from "react-native";

const OrdersHeader = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center justify-between py-4">
      <Text
        className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}
      >
        My Orders
      </Text>
      {/* <View className={`rounded-full ${isDark ? "bg-gray-800" : "bg-gray-200"}`}>
        <Pressable
          style={({ pressed }) => ({ padding: 8, opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name="search" size={20} color={isDark ? "#fff" : "#000"} />
        </Pressable>
      </View> */}
    </View>
  );
};

export default OrdersHeader;
