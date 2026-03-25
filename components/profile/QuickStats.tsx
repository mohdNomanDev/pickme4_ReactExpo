import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QuickStatsProps {
  walletBalance: number;
  loyaltyPoints: number;
  walletLabel: string;
  pointsLabel: string;
  onWalletPress?: () => void;
  onPointsPress?: () => void;
}

export const QuickStats = ({ 
  walletBalance, 
  loyaltyPoints, 
  walletLabel, 
  pointsLabel,
  onWalletPress,
  onPointsPress
}: QuickStatsProps) => {
  return (
    <View className="flex-row gap-4 mb-8">
      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onWalletPress}
        className="flex-1 bg-white dark:bg-gray-800 rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center"
      >
        <View className="w-10 h-10 bg-green-50 dark:bg-green-500/10 rounded-full items-center justify-center mr-3">
          <Ionicons name="wallet" size={20} color="#10b981" />
        </View>
        <View className="flex-1">
          <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5 text-start">
            {walletLabel}
          </Text>
          <Text className="text-base font-bold text-gray-900 dark:text-white text-start">
            {walletBalance.toFixed(2)} <Text className="text-xs font-medium">SAR</Text>
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        activeOpacity={0.7} 
        onPress={onPointsPress}
        className="flex-1 bg-white dark:bg-gray-800 rounded-[24px] p-4 shadow-sm shadow-black/5 flex-row items-center"
      >
        <View className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 rounded-full items-center justify-center mr-3">
          <Ionicons name="star" size={20} color="#f97316" />
        </View>
        <View className="flex-1">
          <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-0.5 text-start">
            {pointsLabel}
          </Text>
          <Text className="text-base font-bold text-gray-900 dark:text-white text-start">
            {loyaltyPoints}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
