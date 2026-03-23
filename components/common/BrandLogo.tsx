import React from "react";
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function BrandLogo() {
  const { isRTL } = useSelector((state: RootState) => state.language);
  return (
    <View className={`flex-row items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Brand Text */}
      <Text className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Pickme<Text className="text-orange-500">4</Text>
      </Text>
    </View>
  );
}
