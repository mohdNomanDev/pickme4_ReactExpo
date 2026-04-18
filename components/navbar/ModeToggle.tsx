import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setAppMode, AppMode } from "../../store/appModeSlice";

export default function ModeToggle() {
  const dispatch = useDispatch();
  const activeMode = useSelector((state: RootState) => state.appMode.mode);
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const handleModeChange = (mode: AppMode) => {
    // Small delay to ensure any pending navigation context updates are settled
    setTimeout(() => {
      dispatch(setAppMode(mode));
    }, 0);
  };

  return (
    <View className={`flex-row bg-gray-100 dark:bg-gray-800 p-1 rounded-full `}>
      {/* Food Mode Button */}
      <Pressable
        onPress={() => handleModeChange("food")}
        className={`flex-row items-center justify-center px-3 py-1.5 rounded-full gap-1.5 ${activeMode === "food" ? "bg-white dark:bg-gray-700 shadow-sm" : ""} `}
      >
        <Ionicons
          name="fast-food"
          size={14}
          color={
            activeMode === "food" ? "#F97316" : isDark ? "#9CA3AF" : "#6B7280"
          }
        />
        <Text
          className={`text-xs font-bold ${activeMode === "food" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {"Food"}
        </Text>
      </Pressable>

      {/* Ride Mode Button */}
      <Pressable
        onPress={() => handleModeChange("ride")}
        className={`flex-row items-center justify-center px-3 py-1.5 rounded-full gap-1.5 ${activeMode === "ride" ? "bg-white dark:bg-gray-700 shadow-sm" : ""} `}
      >
        <Ionicons
          name="car"
          size={16}
          color={
            activeMode === "ride" ? "#3B82F6" : isDark ? "#9CA3AF" : "#6B7280"
          }
        />
        <Text
          className={`text-xs font-bold ${activeMode === "ride" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
        >
          {"Ride"}
        </Text>
      </Pressable>
    </View>
  );
}
