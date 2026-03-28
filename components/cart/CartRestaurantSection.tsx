import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItemCard from "./CartItemCard";

const CartRestaurantSection = ({ section }: { section: any }) => {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-2xl p-4 mb-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <View className="flex-row items-center mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <View className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-full mr-3">
          <Ionicons name="restaurant-outline" size={20} className="text-orange-500 dark:text-orange-400" />
        </View>
        <Text className="text-lg font-bold text-gray-900 dark:text-white flex-1">
          {section.restaurantId}
        </Text>
      </View>

      <View className="gap-y-4">
        {section.items.map((item: any, index: number) => (
          <CartItemCard
            key={index}
            item={item}
            restaurantId={section.restaurantId}
          />
        ))}
      </View>
    </View>
  );
};

export default CartRestaurantSection;
