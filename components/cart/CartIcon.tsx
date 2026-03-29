import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";

export interface CartIconProps extends TouchableOpacityProps {
  itemCount?: number;
  onPress?: () => void;
  size?: number;
  color?: string;
  className?: string;
}

export default function CartIcon({
  itemCount = 0,
  onPress,
  size = 28,
  color,
  className = "",
  ...props
}: CartIconProps) {
  const { colorScheme } = useColorScheme();

  // Default icon color based on theme, if no explicit color is provided
  const iconColor = color || (colorScheme === "dark" ? "#ffffff" : "#111827");

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`relative p-2 justify-center items-center ${className}`}
      accessibilityRole="button"
      accessibilityLabel="Shopping Cart"
      {...props}
    >
      <Ionicons name="cart-outline" size={size} color={iconColor} />

      {itemCount > 0 && (
        <View className="absolute top-0 right-0 bg-red-500 rounded-full h-[20px] min-w-[20px] items-center justify-center px-1 border-2 border-white dark:border-background-dark z-10">
          <Text className="text-text dark:text-text-dark text-[10px] font-bold text-center">
            {itemCount > 99 ? "99+" : itemCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
