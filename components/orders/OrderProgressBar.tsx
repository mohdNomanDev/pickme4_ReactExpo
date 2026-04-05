import React from 'react';
import { useColorScheme } from "nativewind";
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ActiveOrder } from '../../store/ordersSlice';

interface Props {
  order: ActiveOrder;
}

const OrderProgressBar = ({ order }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const progressPercent = `${Math.min(Math.max(order.progress * 100, 0), 100)}%`;

  return (
    <View className="my-4">
      <View className="flex-row justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          <Text className={`ml-1 text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Estimated Delivery
          </Text>
        </View>
        <Text className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {order.estimatedDeliveryTime}
        </Text>
      </View>
      
      <View className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <View 
          className="h-full bg-orange-500 rounded-full" 
          style={{ width: progressPercent as any }}
        />
      </View>
      
      <Text className={`text-xs mt-2 text-right ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {order.remainingTime} mins remaining
      </Text>
    </View>
  );
};

export default OrderProgressBar;
