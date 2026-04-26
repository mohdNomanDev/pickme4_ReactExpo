import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

interface ButtonProps extends PressableProps {
  loading?: boolean;
  title: string;
  variant?: "primary" | "secondary";
}

export default function Button({
  disabled,
  loading = false,
  title,
  variant = "primary",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantClasses =
    variant === "primary"
      ? "bg-orange-500"
      : "border border-orange-200 bg-orange-50 dark:border-orange-900/60 dark:bg-orange-950/40";
  const textClasses =
    variant === "primary"
      ? "text-white"
      : "text-orange-700 dark:text-orange-300";

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      className={`min-h-14 flex-row items-center justify-center gap-3 rounded-2xl px-5 ${variantClasses} ${
        isDisabled ? "opacity-70" : "active:opacity-90"
      }`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#ffffff" : "#f97316"} />
      ) : null}
      <Text className={`text-base font-extrabold ${textClasses}`}>
        {loading ? "Please wait..." : title}
      </Text>
    </Pressable>
  );
}
