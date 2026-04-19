import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItemCard from "./CartItemCard";

const CartRestaurantSection = ({ section }: { section: any }) => {
  return (
    <View className="bg-card dark:bg-card-dark rounded-2xl p-4 mb-4 shadow-md border border-border dark:border-border-dark">
      <View className="flex-row items-center mb-4 pb-3 border-b border-border dark:border-border-dark">
        <View className="bg-primary/20 p-2 rounded-full mr-3 ">
          <Ionicons
            name="restaurant-outline"
            size={20}
            className="text-primary"
          />
        </View>
        <Text className="text-lg font-bold text-text dark:text-text-dark flex-1 text-left ">
          {section.restaurantName || "Restaurant"}
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
