import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BrandLogo from "../common/BrandLogo";
import LocationSelector from "./LocationSelector";

const Navbar = () => {
  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-100 z-50">
      
      {/* Left Section: Brand */}
      <View className="flex-shrink-0">
        <BrandLogo />
      </View>

      {/* Center Section: Location Selector */}
      <View className="flex-1 items-start px-4 z-50">
        <LocationSelector />
      </View>

      {/* Right Section: Actions */}
      <View className="flex-row items-center gap-2 flex-shrink-0">
        <Pressable className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center active:bg-gray-100">
          <Ionicons name="search" size={20} color="#374151" />
        </Pressable>
        
        <Pressable className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center active:bg-gray-100">
          {/* Notification Badge */}
          <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-orange-500 rounded-full z-10 border-2 border-gray-50" />
          <Ionicons name="cart-outline" size={20} color="#374151" />
        </Pressable>
      </View>
      
    </View>
  );
};

export default Navbar;
