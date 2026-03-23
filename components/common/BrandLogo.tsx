import React from 'react';
import { View, Text, Image } from 'react-native';

export default function BrandLogo() {
  return (
    <View className="flex-row items-center gap-2">
      {/* 
        Logo Image Container 
        Replace source with require('../../assets/images/logo.png') when ready 
      */}
      <View className="w-8 h-8 bg-orange-500 rounded-lg items-center justify-center shadow-sm">
        <Text className="text-white font-black text-lg">P4</Text>
      </View>
      
      {/* Brand Text */}
      <Text className="text-xl font-extrabold text-gray-900 tracking-tight">Pickme<Text className="text-orange-500">4</Text></Text>
    </View>
  );
}
