import React from "react";
import { Text, View } from "react-native";

export default function BrandLogo() {
    return (
    <View className={`flex-row items-center gap-2 `}>
      {/* Brand Text */}
      <Text className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Pickme<Text className="text-orange-500">4</Text>
      </Text>
    </View>
  );
}
