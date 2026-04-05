import React from 'react';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import OrderCard from './OrderCard';
import { ActiveOrder } from '../../store/ordersSlice';

interface Props {
  orders: ActiveOrder[];
}

const ActiveOrdersSection = ({ orders = [] }: Props) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (orders.length === 0) {
    return (
      <View className="py-20 items-center justify-center w-full">
        <Text className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No active orders right now
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap w-full mt-4">
      {orders.map((order) => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </View>
  );
};

export default ActiveOrdersSection;
