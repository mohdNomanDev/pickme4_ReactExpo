import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PlaceOrderButton = ({ total }: { total: number }) => {
  
  return (
    <TouchableOpacity
      className="bg-primary active:opacity-80 rounded-xl py-4 px-6 flex-row justify-between items-center shadow-lg w-full mt-4 shadow-primary/30"
    >
      <Text className="text-white font-bold text-lg text-left ">
        {"Place Order"}
      </Text>
      <View className="bg-black/20 dark:bg-white/10 px-3 py-1.5 rounded-lg">
        <Text
          className="text-white font-bold text-right tabular-nums"
        >
          {"SAR"} {total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlaceOrderButton;
