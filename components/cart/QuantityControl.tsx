import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "@/store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const QuantityControl = ({ quantity, item, restaurantId }: { quantity: number, item: any, restaurantId: string }) => {
  const dispatch = useDispatch();

  return (
    <View className="flex-row rtl:flex-row-reverse items-center bg-[#3A2A1D] rounded-full border border-[#4A3A2D] shadow-sm">
      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-full active:opacity-80"
        onPress={() =>
          dispatch(decreaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons name={quantity > 1 ? "remove" : "trash-outline"} size={16} className={quantity > 1 ? "text-gray-300" : "text-red-500"} />
      </TouchableOpacity>

      <View className="px-1 min-w-[24px] items-center">
        <Text className="font-bold text-white text-base" style={{ fontVariant: ['tabular-nums'] }}>{quantity}</Text>
      </View>

      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-full bg-orange-500 active:bg-orange-600 shadow-md"
        onPress={() =>
          dispatch(increaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons name="add" size={16} className="text-white" />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityControl;
