import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SavedAddresses from "./SavedAddresses";

interface LocationDropdownProps {
  onClose?: () => void;
  containerClassName?: string;
}

export default function LocationDropdown({ onClose, containerClassName = "" }: LocationDropdownProps) {
      const { colorScheme } = useColorScheme();
  const router = useRouter();

  const handleAddNewAddress = () => {
    if (onClose) onClose();
    router.push("/Food/addnewaddresspage");
  };

  return (
    <View
      className={`w-80 bg-white dark:bg-card-dark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden ${Platform.OS === "web" ? "shadow-gray-200 dark:shadow-black" : ""} ${containerClassName}`}
      style={Platform.OS !== "web" ? { elevation: 5 } : {}}
    >
      {/* Action: Use Current Location */}
      <Pressable
        onPress={onClose}
        className={`flex-row items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800 bg-orange-50/50 dark:bg-orange-900/20 active:bg-orange-100 dark:active:bg-orange-900/40 `}
      >
        <View className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full items-center justify-center">
          <Ionicons name="navigate" size={16} color="#F97316" />
        </View>
        <Text
          className={`text-orange-600 dark:text-orange-500 font-medium ${'text-left'}`}
        >
          {"Use current location"}
        </Text>
      </Pressable>

      {/* Saved Addresses Section */}
      <View className="max-h-60">
        <ScrollView showsVerticalScrollIndicator={false}>
          <SavedAddresses onClose={onClose} />
        </ScrollView>
      </View>

      {/* Action: Add New Address */}
      <Pressable
        onPress={handleAddNewAddress}
        className={`flex-row items-center gap-2 p-4 border-t border-gray-100 dark:border-gray-800 active:bg-gray-50 dark:active:bg-gray-800/50 `}
      >
        <Ionicons name="add" size={20} color="#F97316" />
        <Text
          className={`text-orange-600 dark:text-orange-500 font-bold text-sm ${'text-left'}`}
        >
          {"Add a new address"}
        </Text>
      </Pressable>
    </View>
  );
}
