import React from "react";
import { Text, View } from "react-native";

export default function RideScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold text-gray-800 dark:text-white">
        Ride Service Coming Soon
      </Text>
      <Text className="text-gray-500 dark:text-gray-400 mt-2">
        We are building something awesome for you!
      </Text>
    </View>
  );
}
