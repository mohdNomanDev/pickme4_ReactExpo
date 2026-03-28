import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "@/store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const QuantityControl = ({ quantity, item, restaurantId }: { quantity: number, item: any, restaurantId: string }) => {
  const dispatch = useDispatch();

  return (
    <View className="flex-row items-center bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm">
      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-l-full active:bg-gray-100 dark:active:bg-gray-600"
        onPress={() =>
          dispatch(decreaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons name={quantity > 1 ? "remove" : "trash-outline"} size={16} className={quantity > 1 ? "text-gray-600 dark:text-gray-300" : "text-red-500"} />
      </TouchableOpacity>

      <View className="px-2 min-w-[24px] items-center">
        <Text className="font-bold text-gray-900 dark:text-white" style={{ fontVariant: ['tabular-nums'] }}>{quantity}</Text>
      </View>

      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-r-full active:bg-gray-100 dark:active:bg-gray-600"
        onPress={() =>
          dispatch(increaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons name="add" size={16} className="text-orange-500" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityControl;
