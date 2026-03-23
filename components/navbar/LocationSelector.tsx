import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useColorScheme } from 'nativewind';
import LocationDropdown from './LocationDropdown';

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { colorScheme } = useColorScheme();

  return (
    <View className="relative z-50">
      <Pressable 
        onPress={() => setIsOpen(!isOpen)}
        className={`flex-row items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-700 ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        {/* Icon Container */}
        <View className="bg-white dark:bg-gray-700 p-1.5 rounded-full shadow-sm">
          <Ionicons name="location" size={14} color="#F97316" />
        </View>

        {/* Text Container */}
        <View className={`flex-col justify-center ${isRTL ? 'items-end' : 'items-start'}`}>
          <Text className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">
            {t('location.delivering_to', 'Delivering to')}
          </Text>
          <Text className="text-sm font-extrabold text-gray-900 dark:text-white leading-none">
            {t('location.current_location_name', 'Riyadh, Al Olaya')}
          </Text>
        </View>

        {/* Dropdown Indicator Container */}
        <View className={`${isRTL ? 'mr-1' : 'ml-1'}`}>
          <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={colorScheme === 'dark' ? '#9CA3AF' : '#6B7280'} />
        </View>
      </Pressable>

      {/* Render Dropdown when open */}
      {isOpen && <LocationDropdown />}
    </View>
  );
}
