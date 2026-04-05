import React from 'react';
import { useColorScheme } from "nativewind";
import { View, Text, Pressable } from 'react-native';
import { ActiveOrder } from '../../store/ordersSlice';

interface Props {
  order: ActiveOrder;
}

const OrderActions = ({ order }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-row items-center justify-between mt-2 space-x-3">
      {order.actions.canContact && (
        <View className={`flex-1 rounded-xl border ${
          isDark ? 'border-gray-600' : 'border-gray-300'
        }`}>
          <Pressable 
            style={({ pressed }) => ({ paddingVertical: 12, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 })}
          >
            <Text className={`font-semibold ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Contact Support
            </Text>
          </Pressable>
        </View>
      )}

      {order.actions.canTrack && (
        <View className="flex-1 rounded-xl bg-orange-500 shadow-sm">
          <Pressable 
            style={({ pressed }) => ({ paddingVertical: 12, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 })}
          >
            <Text className="font-semibold text-white">
              Track Order
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default OrderActions;
