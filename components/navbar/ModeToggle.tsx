import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useColorScheme } from 'nativewind';

export default function ModeToggle() {
  const [activeMode, setActiveMode] = useState<'food' | 'ride'>('food');
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  return (
    <View className={`flex-row bg-gray-100 dark:bg-gray-800 p-1 rounded-full ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Food Mode Button */}
      <Pressable 
        onPress={() => setActiveMode('food')}
        className={`flex-row items-center justify-center px-3 py-1.5 rounded-full gap-1.5 ${activeMode === 'food' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <Ionicons 
          name="fast-food" 
          size={14} 
          color={activeMode === 'food' ? '#F97316' : (isDark ? '#9CA3AF' : '#6B7280')} 
        />
        <Text className={`text-xs font-bold ${activeMode === 'food' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {t('mode.food', 'Food')}
        </Text>
      </Pressable>

      {/* Ride Mode Button */}
      <Pressable 
        onPress={() => setActiveMode('ride')}
        className={`flex-row items-center justify-center px-3 py-1.5 rounded-full gap-1.5 ${activeMode === 'ride' ? 'bg-white dark:bg-gray-700 shadow-sm' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <Ionicons 
          name="car" 
          size={16} 
          color={activeMode === 'ride' ? '#3B82F6' : (isDark ? '#9CA3AF' : '#6B7280')} 
        />
        <Text className={`text-xs font-bold ${activeMode === 'ride' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
          {t('mode.ride', 'Ride')}
        </Text>
      </Pressable>
    </View>
  );
}
