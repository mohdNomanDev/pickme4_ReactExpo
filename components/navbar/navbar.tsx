import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useColorScheme } from 'nativewind';
import BrandLogo from "../common/BrandLogo";
import LocationSelector from "./LocationSelector";

const Navbar = () => {
  const { isRTL } = useSelector((state: RootState) => state.language);
  const { colorScheme } = useColorScheme();

  return (
    <View className={`flex-row items-center justify-between px-4 py-3 bg-white dark:bg-card-dark border-b border-gray-100 dark:border-gray-800 z-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Left Section: Brand */}
      <View className="flex-shrink-0">
        <BrandLogo />
      </View>

      {/* Center Section: Location Selector */}
      <View className={`flex-1 px-4 z-50 ${isRTL ? 'items-end' : 'items-start'}`}>
        <LocationSelector />
      </View>

      {/* Right Section: Actions */}
      <View className={`flex-row items-center gap-2 flex-shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <Pressable className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full items-center justify-center active:bg-gray-100 dark:active:bg-gray-700">
          <Ionicons name="search" size={20} color={colorScheme === 'dark' ? '#D1D5DB' : '#374151'} />
        </Pressable>
        
        <Pressable className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full items-center justify-center active:bg-gray-100 dark:active:bg-gray-700">
          {/* Notification Badge */}
          <View className={`absolute top-2 ${isRTL ? 'left-2' : 'right-2'} w-2.5 h-2.5 bg-orange-500 rounded-full z-10 border-2 border-white dark:border-card-dark`} />
          <Ionicons name="cart-outline" size={20} color={colorScheme === 'dark' ? '#D1D5DB' : '#374151'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Navbar;
