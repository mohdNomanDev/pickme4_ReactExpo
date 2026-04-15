import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { increaseQty, decreaseQty } from "@/store/cartSlice";
import { Ionicons } from "@expo/vector-icons";

const QuantityControl = ({
  quantity,
  item,
  restaurantId,
}: {
  quantity: number;
  item: any;
  restaurantId: string;
}) => {
  const dispatch = useDispatch();

  return (
    <View className="flex-row items-center bg-border dark:bg-border-dark rounded-full border border-border dark:border-border-dark shadow-sm">
      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-full active:opacity-80"
        onPress={() =>
          dispatch(decreaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons
          name={quantity > 1 ? "remove" : "trash-outline"}
          size={16}
          className={
            quantity > 1
              ? "text-text-muted dark:text-text-muted-dark"
              : "text-red-500"
          }
        />
      </TouchableOpacity>

      <View className="w-10 items-center">
        <Text
          className="font-bold text-text dark:text-text-dark text-base tabular-nums"
        >
          {quantity}
        </Text>
      </View>


      <TouchableOpacity
        className="p-2 items-center justify-center w-8 h-8 rounded-full bg-primary active:bg-primary/80 shadow-md"
        onPress={() =>
          dispatch(increaseQty({ restaurantId, itemName: item.name }))
        }
      >
        <Ionicons
          name="add"
          size={16}
          className="text-text dark:text-text-dark"
        />
      </TouchableOpacity>
    </View>
  );
};

export default QuantityControl;
