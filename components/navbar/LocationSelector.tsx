import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocationDropdown from './LocationDropdown';

export default function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="relative z-50">
      <Pressable 
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 active:bg-gray-100"
      >
        {/* Icon Container */}
        <View className="bg-white p-1.5 rounded-full shadow-sm">
          <Ionicons name="location" size={14} color="#F97316" />
        </View>

        {/* Text Container */}
        <View className="flex-col justify-center">
          <Text className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-none mb-0.5">
            Delivering to
          </Text>
          <Text className="text-sm font-extrabold text-gray-900 leading-none">
            Riyadh, Al Olaya
          </Text>
        </View>

        {/* Dropdown Indicator Container */}
        <View className="ml-1">
          <Ionicons name={isOpen ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
        </View>
      </Pressable>

      {/* Render Dropdown when open */}
      {isOpen && <LocationDropdown />}
    </View>
  );
}
