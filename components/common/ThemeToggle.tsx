import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { useThemePreference } from "@/hooks/useThemePreference";
import { ThemeMode } from "@/store/themeSlice";

type ThemeToggleProps = {
  className?: string;
  compact?: boolean;
};

type ThemeOption = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  mode: ThemeMode;
};

const THEME_OPTIONS: ThemeOption[] = [
  { mode: "light", label: "Light", icon: "sunny-outline" },
  { mode: "dark", label: "Dark", icon: "moon-outline" },
  { mode: "system", label: "System", icon: "phone-portrait-outline" },
];

export default function ThemeToggle({
  className = "",
  compact = false,
}: ThemeToggleProps) {
  const { isDark, setThemeMode, themeMode } = useThemePreference();

  return (
    <View
      className={`flex-row items-center rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {THEME_OPTIONS.map(({ icon, label, mode }) => {
        const isActive = themeMode === mode;

        return (
          <Pressable
            key={mode}
            accessibilityLabel={`Use ${label.toLowerCase()} theme`}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={() => setThemeMode(mode)}
            className={`min-h-9 flex-row items-center justify-center gap-1.5 rounded-full px-3 active:opacity-80 ${
              isActive ? "bg-primary shadow-sm" : "bg-transparent"
            }`}
          >
            <Ionicons
              name={icon}
              size={16}
              color={isActive ? "#ffffff" : isDark ? "#d1d5db" : "#4b5563"}
            />
            <Text
              className={`text-xs font-extrabold ${
                compact ? "hidden md:flex" : ""
              } ${isActive ? "text-white" : "text-gray-700 dark:text-gray-200"}`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
