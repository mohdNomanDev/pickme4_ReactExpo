import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

type InputIconName = keyof typeof Ionicons.glyphMap;

interface InputFieldProps extends TextInputProps {
  error?: string;
  icon?: InputIconName;
  label: string;
}

const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ error, icon, label, className = "", ...props }, ref) => {
    return (
      <View className="gap-2">
        <Text className="text-sm font-bold text-gray-800 dark:text-gray-100">
          {label}
        </Text>
        <View
          className={`flex-row items-center rounded-2xl border bg-white px-4 dark:bg-gray-900 ${
            error
              ? "border-red-400"
              : "border-orange-100 focus:border-orange-500 dark:border-gray-800"
          }`}
        >
          {icon ? (
            <Ionicons
              name={icon}
              size={20}
              color={error ? "#f87171" : "#f97316"}
            />
          ) : null}
          <TextInput
            ref={ref}
            className={`min-h-14 flex-1 px-3 text-base font-semibold text-gray-950 outline-none dark:text-white ${className}`}
            placeholderTextColor="#9ca3af"
            {...props}
          />
        </View>
        {error ? (
          <Text className="text-xs font-semibold text-red-500" selectable>
            {error}
          </Text>
        ) : null}
      </View>
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
